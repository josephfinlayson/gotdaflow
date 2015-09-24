import React from 'react';
import {executeFlow} from '../action-creators';
import {Input, ButtonInput} from 'react-bootstrap';

export default React.createClass(
{
    _onExecuteClick()
    {
        executeFlow( this.refs.data.getValue() )
    },

    render()
    {
        return (
            <div className="row">
                <div className="col-md-12">
                    <h2 className="page-header">Step 2: data <small>Enter the data to execute the rules on</small></h2>
        	       <Input type="textarea" label="JSON String" ref="data" />
                    <ButtonInput type="submit" onClick={this._onExecuteClick}value="Execute Da Flow!" bsSize="large" />
                </div>
            </div>
        );
    }
} );
