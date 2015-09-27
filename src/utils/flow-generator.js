/**
 * Rule properties and whether they are required or not
 *
 * @var     obj
 */
const validation =
{
    id            : { required : true },
    title         : { required : true },
    body          : { required : true },
    trueResultId  : { required : false },
    falseResultId : { required : false }
};


/**
 * Class generates a rule flow
 *
 * @constructor 
 */
class FlowGenerator
{


    /**
     * Initializes the flow generator
     *
     * @return  void
     */
    constructor()
    {
        this._rules  = [];
    }


    /**
     * Adds a rule to the flow
     *
     * @param   obj                 rule                rule information
     *
     * @return  void
     */
    addRule( rule )
    {
        // To ignore empty rules. Perhaps this should be added to the errors
        if ( ! rule )
        {
            return;
        }

        this._validateRule( rule );
        this._validateIds( rule )
        rule.bodyFunction = this._createFunctionFromString( rule.body );

        this._rules.push( rule );
    }


    /**
     * Returns the flow rules
     *
     * @return  arr                                     flow rules
     */
    getRules()
    {
        return this._rules;
    }


    /**
     * Empties the all the rules stored in the flow
     *
     * @return  void
     */
    resetRules()
    {
        this._rules = [];
    }


    /**
     * Executes the rules in the flow on the supplied JSON string
     *
     * @param   str                 JSON                JSON string
     *
     * @return  arr                                     results
     */
    execute( JSON )
    {
        var results = [];
        var rules   = this._rules;
        var result;

        // First rule to execute is always the first one
        var ruleToExecute = rules[0];

        // As long as there are rules to execute...
        while ( ruleToExecute )
        {
            result = ruleToExecute.bodyFunction( JSON );

            results.push(
            {
                title  : ruleToExecute.title,
                passed : result,
                id     : ruleToExecute.id
            } );

            // If the rule returned true, set the next rule to execute as the
            // one with the true result id of the current rule
            if ( result )
            {
                ruleToExecute = this._findWhere( 'id', ruleToExecute.trueResultId );
            }
            // Else, set the next rule to execute as the one with the false
            // result id of the current rule
            else
            {
                ruleToExecute = this._findWhere( 'id', ruleToExecute.falseResultId );
            }
        }

        return results;
    }


    /**
     * Creates a function from the passed string
     *
     * This method uses regex to find out if the passed string actually
     * represents a function (with one parameter only), and tries to isolate the
     * parameter and the body, to use the Function constructor. While using
     * Regex can prove treacherous, i decided its the lesser of two evils in
     * this case since my other option was to use eval() which has worse flows
     * and provides me less control. Also, by using regex i provided some
     * validation about the content of the body.  
     *
     * @param   str                 string              well.. string... duh...
     *
     * @return  func                                    a function 
     */
    _createFunctionFromString( string )
    {
        if ( ! string )
        {
            throw new Error( 109 );
        }

        var match = string.match( /\((.+|)\)(.+)?\{(.+)\}/ );

        if ( ! match )
        {
            throw new Error( 109 );
        }

        var argument = match[1];

        if ( ! argument )
        {
            throw new Error( 110 );
        }

        var body = match[3];

        if ( ! body )
        {
            throw new Error( 111 );
        }

        return Function( argument.trim(), body.trim() );
    }


    /**
     * Validates that the rule has all the required data to be added to the flow
     *
     * @param   obj                 rule                rule information
     *
     * @return  void
     */
    _validateRule( rule )
    {
        var allowedType;
        var required;
        var value;

        for( var key in validation )
        {
            if ( validation.hasOwnProperty( key ) )
            {
                allowedType = validation[key].type;
                required    = validation[key].required;
                value       = rule[key];

                if ( required && ! value )
                {
                    throw new Error( 108 );
                }
            }
        }
    }


    /**
     * Validates the the rule id, trueResultIt and falseResultId are ok
     *
     * @param   obj                 rule                rule information
     *
     * @return  void
     */
    _validateIds( rule )
    {
        if ( this._findWhere( 'id', rule.id ) )
        {
            throw new Error( 101 );
        };

        if ( rule.id === rule.trueResultId )
        {
            throw new Error( 102 );
        }

        if ( rule.id === rule.falseResultId )
        {
            throw new Error( 103 );
        }

        if ( this._findWhere( 'trueResultId', rule.trueResultId ) )
        {
            throw new Error( 104 );
        }

        if ( this._findWhere( 'falseResultId', rule.falseResultId ) )
        {
            throw new Error( 105 );
        }

        if ( this._rules[0] && this._rules[0].id === rule.trueResultId )
        {
            throw new Error( 106 );
        }

        if ( this._rules[0] && this._rules[0].id === rule.falseResultId )
        {
            throw new Error( 107 );
        }
    }


    /**
     * Iterates over the flow's rules and returns the first rule it finds with
     * the passed key as a property which has a corresponding value equal to
     * the passed value
     *
     * @param   str                 key                 property key
     * @param   mixed               value               property value
     *
     * @return  mixed                                   if a rule is found, it
     *                                                  will return the rule
     *                                                  object. Otherwise, it
     *                                                  will return false
     */
    _findWhere( key, value )
    {
        var len = this._rules.length;
        var i;
        var existingValue;

        for ( i = 0; i < len; i++ )
        {
            existingValue = this._rules[i][key];

            if ( existingValue && existingValue === value)
            {
                return this._rules[i];
            }
        }

        return false;
    }


}



export default FlowGenerator;