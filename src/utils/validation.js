const ruleSchema =
{
    id            : { type : 'string' },
    title         : { type : 'string' },
    body          : { type : 'function' },
    trueResultId  : { type : 'string', allowNull : true },
    falseResultId : { type : 'string', allowNull : true }
};

export default
{

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
}