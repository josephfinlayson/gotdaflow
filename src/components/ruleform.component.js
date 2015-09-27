import React from 'react';
import {addRule} from '../action-creators';
import {Alert, Input, ButtonInput, Collapse} from 'react-bootstrap';
import {errors} from '../constants/constants';

export default React.createClass(
{

    /**
     * The properties this component expects and their types
     *
     * @var     obj
     */
    propTypes :
    {
        rule  : React.PropTypes.object,
        error : React.PropTypes.oneOfType(
        [
            React.PropTypes.number, React.PropTypes.string
        ] )
    },


    /**
     * Creates the initial state of the component
     *
     * @return  obj                                     component state
     */
    getInitialState()
    {
        return {
            id            : '',
            title         : '',
            body          : '',
            trueResultId  : '',
            falseResultId : '',
            error         : false,
            disabled      : true
        }
    },


    /**
     * Checks if the state of the form should be disabled or not
     *
     * @param   str                 key             the name of the updated
     *                                              input
     * @param   str                 value           the value of the updated
     *                                              input
     *
     * @return  bool                                true if the form is
     *                                              disabled, false otherwise
     */
    _checkIfDisabled( key, value )
    {
        var required =
        {
            id    : this.state.id,
            title : this.state.title,
            body  : this.state.body
        };

        required[key] = value;

        if ( required.id && required.title && required.body )
        {
            return false;
        }
        
        return true;
    },


    /**
     * Updates the state upon changes to the form inputs
     *
     * @param   obj                 e                   event
     *
     * @return  void
     */
    _onChange( e )
    {
        var stateToSet            = {};
        stateToSet[e.target.name] = e.target.value;
        stateToSet.disabled       = this._checkIfDisabled( e.target.name, e.target.value );

        this.setState( stateToSet );
    },


    /**
     * Fires the addRule action to add the rule represented by this form
     * to the flow. If the rule was added succsefully, it resets the state
     * of the form. Otherwise, it updates the form with the error coming from
     * the flow generator.
     *
     * Try catch is in place because adding a rule mght throw errors that need
     * catching by this form, so it can display them. Perhaps not the best error
     * reporting architectural choice, but throwing errors in the flow generator
     * was chosen at the beginning in order to make it a stand-alone part of the
     * application.
     *
     * @param   obj                 e                   event
     *
     * @return  void
     */
    _onAddClick( e )
    {
        e.preventDefault();

        try
        {
            addRule( this.state );
            this.setState( this.getInitialState() )
        }
        catch( e )
        {
            this.setState( { error : e.message} )
        }
    },

    _onResetClick( e )
    {
        e.preventDefault();

        this.setState( this.getInitialState() );
    },


    /**
     * Renders the component
     *
     * @return  JSX                                     component markup
     */
    render()
    {


        return (
            <div className="row">
                <div className="col-md-12">
                    <h2 className="page-header">Step 1: Create a new rule! <small>Don't be shy!</small></h2>
            <Collapse in={this.state.error !== false }>
                <div>
                    <Alert bsStyle="danger">{errors[this.state.error]}</Alert>
                </div>
            </Collapse>
                    <form>
                        <Input onChange={this._onChange} type="text" name="id" label="Rule id" placeholder="e.g. 12" value={this.state.id} />
                        <Input onChange={this._onChange} type="text" name="title" label="Rule title" placeholder="e.g. Check if the data is relly there" value={this.state.title} />
                        <Input onChange={this._onChange} type="textarea" name="body" label="Rule body" placeholder="e.g. function( data ) { returns data !== false }" value={this.state.body} />
                        <Input onChange={this._onChange} type="text" name="trueResultId" label="If result is true - go to this rule" placeholder="e.g. 233" value={this.state.trueResultId} />
                        <Input onChange={this._onChange} type="text" name="falseResultId" label="if result is false - go to that rule" placeholder="e.g. 342" value={this.state.falseResultId} />
                        <ButtonInput wrapperClassName="pull-left" disabled={this.state.disabled} type="submit" onClick={this._onAddClick}value="Add the rule!" bsSize="large" />
                        <ButtonInput wrapperClassName="pull-left" type="submit" onClick={this._onResetClick}value="reset" bsSize="large" />
                    </form>
                </div>
            </div>
        )
    }


} );
