export default 
{
    CHANGE_EVENT : 'change',

    actionTypes :
    {
        ADD_RULE     : 'ADD_RULE',
        EXECUTE_FLOW : 'EXECUTE_FLOW',
        RESET_RULES  : 'RESET_RULES'
    },

    errors:
    {
        101 : 'Rule id already exists in the flow',
        102 : 'the id for true result cannot be the same as the rule id',
        103 : 'the id for false result cannot be the same as the rule id',
        104 : 'The id for true result of the rule was already used as a true result id',
        105 : 'The id for false result of the rule was already used as a false result id',
        106 : 'The id for the true result cannot be the id of the first rule in the flow',
        107 : 'The id for the false result cannot be the id of the first rule in the flow',
        108 : 'Rule missing required information',
        109 : 'Could not create function from the supplied Rule Body',
        110 : 'Your Rule Body is missing an argument to represent the data',
        111 : 'Your Rule Body is missing an expression inside the function itself'

    }
}