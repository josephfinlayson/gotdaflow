import React from 'react';

export default React.createClass(
{
    render()
    {
        return (
        <div>
        	JSON INPUT
        	<textarea ref="data"></textarea>
            <button onClick={this._onExecuteClick}>Execute</button>
        </div>
        );
    }
} );
