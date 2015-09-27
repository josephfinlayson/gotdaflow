var dispatcher = require('./dispatcher/');
var {actionTypes} = require('./constants/constants');

module.exports = {

    addRule : function( rule )
    {
        dispatcher.dispatch(
        {
            type : actionTypes.ADD_RULE,
            rule : rule
        } );
    },

    executeFlow : function( json )
    {
        dispatcher.dispatch(
        {
            type : actionTypes.EXECUTE_FLOW,
            json : json
        } )
    },

    resetRules : function()
    {
        dispatcher.dispatch(
        {
             type : actionTypes.RESET_RULES
        })
    }


};
