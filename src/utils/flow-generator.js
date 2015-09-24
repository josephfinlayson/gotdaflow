const validation =
{
    id            : { required : true },
    title         : { required : true },
    body          : { required : true },
    trueResultId  : { required : false },
    falseResultId : { required : false }
};

class FlowGenerator
{


    constructor()
    {
        this._rules  = [];
    }


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


    getRules()
    {
        return this._rules;
    }


    execute( JSON )
    {
        var results = ['start'];
        var rules   = this._rules;

        // First rule to execute is always the first one
        var ruleToExecute = rules[0];

        // As long as there are rules to execute...
        while ( ruleToExecute )
        {
            // Execute the rule, and if it is true, register the passed message
            // and set the next rule to execute as the one with the true result
            // id of the current rule
            if ( ruleToExecute.bodyFunction( JSON ) === true )
            {
                results.push( ruleToExecute.title + ' | passed' );
                ruleToExecute = this._findWhere( 'id', ruleToExecute.trueResultId );
            }
            // Else, register the failed message and set the next rule to
            // execute as the one with the false result id of the current rule
            else
            {
                results.push( ruleToExecute.title + ' | failed' );
                ruleToExecute = this._findWhere( 'id', ruleToExecute.falseResultId );
            }
        }

        results.push( 'end' );

        return results;
    }

    _createFunctionFromString( string )
    {
        if ( ! string )
        {
            throw ( 109 );
        }

        var match = string.match( /\((.+|)\)(.+)?\{(.+)\}/ );

        if ( ! match )
        {
            throw ( 109 );
        }

        var argument = match[1];

        if ( ! argument )
        {
            throw ( 110 );
        }

        var body = match[3];

        if ( ! body )
        {
            throw ( 111 );
        }

        return Function( argument.trim(), body.trim() );
    }

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


    _findWhere( key, val )
    {
        var len = this._rules.length;
        var i;
        var existingValue;

        for ( i = 0; i < len; i++ )
        {
            existingValue = this._rules[i][key];
            if ( existingValue === val && existingValue !== null )
            {
                return this._rules[i];
            }
        }

        return false;
    }


}



export default FlowGenerator;