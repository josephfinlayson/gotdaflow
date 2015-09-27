import React from 'react';
import {executeFlow} from '../action-creators';
import {Input, ButtonInput} from 'react-bootstrap';
import Rules from './rules.component';


/**
 * Checks if a string is valid JSON
 *
 * @param   str                     string              well... a string, duh...
 *
 * @return  bool                                        true if the string is
 *                                                      valid JSON.
 *                                                      false otherwise.
 */
function isJson( string )
{
    try
    {
        JSON.parse( string );
    }
    catch ( e )
    {
        return false;
    }

    return true;
}


export default React.createClass(
{

    /**
     * The properties this component expects and their types
     *
     * @var     obj
     */
    propTypes :
    {
        rules : React.PropTypes.array.isRequired
    },


    /**
     * Creates the initial state of the component
     *
     * @return  obj                                     component state
     */
    getInitialState()
    {
        return {
            json : ''
        }
    },

    /**
     * Fires the exectureFlow action which will eventually tell the flow
     * generator to execute the the flow of existing rules on the data 
     * supplied in this component input
     *
     * @return  void
     */
    _onExecuteClick()
    {
        executeFlow( this.state.json )
    },


    /**
     * Checks if the json input is valid json and returns a state for the
     * textarea
     *
     * @return  str                                     the input state
     */
    validationState()
    {
        // If there is no actual input let's not show error or success
        if ( this.state.json === '' )
        {
            return;
        }

        var isValidJson = isJson( this.state.json );

        if ( isValidJson )
        {
            return 'success';
        }
        else
        { 
            return 'error';
        }
    },


    /**
     * Sets the state on changes to the JSON input
     *
     * @param   obj                 e                   event
     * 
     * @return  void
     */
    _onChange( e )
    {
        this.setState( { json : e.target.value } );
    },


    /**
     * Renders the component
     *
     * @return  JSX                                     component markup
     */
    render()
    {
        var json = this.state.json;

        var buttonDisabled = ( this.props.rules.length < 1 || json.length < 1
            || ! isJson( json ) );

        return (
            <div className="row">
                <div className="col-md-12">
                    <h2 className="page-header">Step 2: data <small>Enter the data to execute the rules on</small></h2>
                    <Rules rules={this.props.rules} />
        	        <Input
                        onChange={this._onChange}
                        type="textarea"
                        value={json}
                        label="Data"
                        help="Must be avalid JSON string"
                        ref="json"
                        bsStyle={this.validationState()} />
                    <ButtonInput type="submit" disabled={buttonDisabled} onClick={this._onExecuteClick}value="Execute Da Flow!" bsSize="large" />
                </div>
            </div>
        );
    }


} );
