const ruleSchema =
{
    id            : { type : 'string' },
    title         : { type : 'string' },
    body          : { type :'function' },
    trueResultId  : { type : 'string', allowNull : true },
    falseResultId : { type : 'string', allowNull : true }
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

        this._rules.push( rule );
    }


    getRules()
    {
        return this._rules;
    }


    _validateIds( rule )
    {
        if ( this._findWhere( 'id', rule.id ) )
        {
            throw 101;
        };

        if ( this._findWhere( 'trueResultId', rule.trueResultId ) )
        {
            throw 102;
        }

        if ( this._findWhere( 'falseResultId', rule.falseResultId ) )
        {
            throw 103;
        }

        if ( this._rules[0] && this._rules[0].id === rule.trueResultId )
        {
            throw 104;
        }

        if ( this._rules[0] && this._rules[0].id === rule.falseResultId )
        {
            throw 105;
        }
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
            if ( ruleToExecute.body( JSON ) === true )
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

    _validateRule( rule )
    {
        var missingKeys = [];
        var allowedType;
        var allowNull;
        var value;

        for( var key in ruleSchema )
        {
            if ( ruleSchema.hasOwnProperty( key ) )
            {
                allowedType = ruleSchema[key].type;
                allowNull   = ruleSchema[key].allowNull;
                value       = rule[key];

                if ( typeof value === 'undefined' )
                {
                    missingKeys.push( key );
                }
                else if ( typeof value !== allowedType )
                {
                    // this is to avoid throwing an exception for null values
                    // in keys where null values are allowed, such as
                    // 'falseResultId'
                    if ( ! (  allowNull && value === null ) )
                    {
                        throw key + ' should be a ' + allowedType;
                    }
                }
            }
        }

        if ( missingKeys.length )
        {
            throw 'Rule missing keys: ' + missingKeys.join( ', ' );
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