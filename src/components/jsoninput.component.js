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
        <div>
        	<Input type="textarea" label="JSON String" ref="data" />
            <ButtonInput type="submit" onClick={this._onExecuteClick}value="Execute Da Flow!" bsSize="large" />
        </div>
        );
    }
} );
