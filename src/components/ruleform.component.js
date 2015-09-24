import React from 'react';
import {addRule} from '../action-creators';
import {Input, ButtonInput} from 'react-bootstrap';

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

    _onAddClick()
    {
        var rule =
        {
            id            : this.refs.id.getValue(),
            title         : this.refs.title.getValue(),
            body          : this.refs.body.getValue(),
            trueResultId  : this.refs.trueResultId.getValue(),
            falseResultId : this.refs.falseResultId.getValue()
        }

        addRule( rule );
    },
    render()
    {
        return (
            <div className="row">
                <div className="col-md-12">
                    <h2 className="page-header">Step 1: Create a new rule! <small>Don't be shy!</small></h2>
                    <form>
                        <Input type="text" ref="id" label="Rule id" placeholder="e.g. 12" />
                        <Input type="text" ref="title" label="Rule title" placeholder="e.g. Check if the data is relly there" />
                        <Input type="textarea" ref="body" label="Rule body" placeholder="e.g. function( data ) { returns data !== false }" />
                        <Input type="text" ref="trueResultId" label="If result is true - go to this rule" placeholder="e.g. 233" />
                        <Input type="text" ref="falseResultId" label="if result is false - go to that rule" placeholder="e.g. 342" />
                        <ButtonInput type="submit" onClick={this._onAddClick}value="Add the rule!" bsSize="large" />
                    </form>
                </div>
            </div>
        )
    }
} );
