import {CHANGE_EVENT, actionTypes} from '../constants/constants';
import Dispatcher from '../dispatcher';
import {EventEmitter} from 'events';
import FlowGenerator from '../utils/flow-generator';

var _flow =
{
    title      : '',
    rules      : new FlowGenerator(),
    error      : null,
    results    : [],
    editedRule : {}
}

class FlowStore extends EventEmitter
{
    constructor()
    {
        super();
    }

    getFlow()
    {
        return _flow;;
    }

    emitChange()
    {
        this.emit( CHANGE_EVENT );
    }


    addChangeListener( callback )
    {
        this.on( CHANGE_EVENT, callback);
    }


    removeChangeListener( callback )
    {
        this.removeListener( CHANGE_EVENT, callback );
    }
}


FlowStore.dispatchToken = Dispatcher.register( function( payload )
{
    var action = payload.type;

    switch( action )
    {
        case actionTypes.ADD_RULE:
            var rule = payload.rule;
            try {
                _flow.rules.addRule( rule )
                flowStore.emitChange();
            } catch( e ) {
                _flow.error = e;
                flowStore.emitChange();
            }
        break;

        case actionTypes.EXECUTE_FLOW:
            var json      = payload.json;
            _flow.results = _flow.rules.execute( JSON.parse( json ) );
            flowStore.emitChange();
        break;

        default:
        // do nothing
    }

} );
var flowStore = new FlowStore();

export default flowStore;