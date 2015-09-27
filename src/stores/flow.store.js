import {CHANGE_EVENT, actionTypes} from '../constants/constants';
import Dispatcher from '../dispatcher';
import {EventEmitter} from 'events';
import FlowGenerator from '../utils/flow-generator';

/**
 * A rule flow
 *
 * @var     obj
 */
var _flow =
{
    title      : '',
    rules      : new FlowGenerator(),
    results    : []
}


/** 
 * Flow store
 *
 * @constructor
 */
class FlowStore extends EventEmitter
{

    /** 
     * Initializes the flow store
     *
     * @return  void
     */
    constructor()
    {
        super();
    }


    /** 
     * Returns the flow object
     *
     * @return  obj                                     flow data
     */
    getFlow()
    {
        return _flow;;
    }


    /** 
     * Emits the change event
     *
     * @return  void
     */
    emitChange()
    {
        this.emit( CHANGE_EVENT );
    }


    /** 
     * Registers a change lstener in the flow
     *
     * @param   func                callback            function to run when
     *                                                  the change event is
     *                                                  triggered
     *
     * @return  void
     */
    addChangeListener( callback )
    {
        this.on( CHANGE_EVENT, callback);
    }


}


/**
 * Registering the flow store to event coming from the event dispatcher
 */
FlowStore.dispatchToken = Dispatcher.register( function( payload )
{
    
    var action = payload.type;

    switch( action )
    {
        case actionTypes.ADD_RULE:
            var rule = payload.rule;
            _flow.rules.addRule( rule );
            flowStore.emitChange();
        break;

        case actionTypes.EXECUTE_FLOW:
            var json      = payload.json;
            _flow.results = _flow.rules.execute( JSON.parse( json ) );
            flowStore.emitChange();
        break;

        default:
    }

} );

var flowStore = new FlowStore();

export default flowStore;