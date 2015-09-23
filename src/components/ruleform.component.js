import React from 'react';
import {addRule} from '../action-creators';

export default React.createClass(
{
    returnSomething(something)
    {
        //this is only for testing purposes. Check /test/components/App-test.js
        return something;
    },

    getInitialState()
    {
        return {
            id            : '',
            title         : '',
            body          : '',
            trueResultId  : '',
            falseResultId : ''
        }
    },

    propTypes :
    {
        rule : React.PropTypes.object
    },

    _onRuleAdd()
    {
        var rule =
        {
            id            : this.refs.id.getDOMNode().value,
            title         : this.refs.title.getDOMNode().value,
            body          : this.refs.body.getDOMNode().value,
            trueResultId  : this.refs.trueResultId.getDOMNode().value,
            falseResultId : this.refs.falseResultId.getDOMNode().value
        }

        addRule( rule );
    },

    render()
    {
        return (
            <form>
                <label>id</label>
                <input type="text" ref="id"/>
                <label>title</label>
                <input type="text" ref="title"/>
                <label>body</label>
                <textarea ref="body"/>
                <label>trueResultId</label>
                <input type="text" ref="trueResultId"/>
                <label>falseResultId</label>
                <input type="text" ref="falseResultId"/>
                <button onClick={this._onRuleAdd}>add</button>
            </form>
        )
    }
} );
