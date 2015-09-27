import React from 'react';
import {executeFlow} from '../action-creators';
import {Input, ButtonInput} from 'react-bootstrap';
import Rules from './rules.component';

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
     * Fires the exectureFlow action which will eventually tell the flow
     * generator to execute the the flow of existing rules on the data 
     * supplied in this component input
     *
     * @return  void
     */
    _onExecuteClick()
    {
        executeFlow( this.refs.data.getValue() )
    },


    /**
     * Renders the component
     *
     * @return  JSX                                     component markup
     */
    render()
    {
        var buttonState = this.props.rules.length < 1;

        return (
            <div className="row">
                <div className="col-md-12">
                    <h2 className="page-header">Step 2: data <small>Enter the data to execute the rules on</small></h2>
                    <Rules rules={this.props.rules} />
        	        <Input type="textarea" label="JSON String" ref="data" />
                    <ButtonInput type="submit" disabled={buttonState} onClick={this._onExecuteClick}value="Execute Da Flow!" bsSize="large" />
                </div>
            </div>
        );
    }


} );
