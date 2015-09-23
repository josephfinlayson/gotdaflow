import React from 'react';
import FlowStore from '../stores/flow.store';
import Rules from './rules.component';
import RuleForm from './ruleform.component';
import JsonInput from './jsoninput.component';
import Errors from './errors.component';
import {Navbar} from 'react-bootstrap';

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
            flow : FlowStore.getFlow()
        }
    },

    componentDidMount()
    {
        FlowStore.addChangeListener( this._onChange );
    },

    _onChange()
    {
        this.setState( this.getInitialState() );
    },


    _onExecuteClick()
    {
        executeFlow( this.refs.data.getDOMNode().value );
    },

    render()
    {   
        var rules        = this.state.flow.rules.getRules();
        var error        = this.state.flow.error;
        var errorDisplay = error ? <Errors error={error}/> : false;

        return (
            <div className="fluid-container">
                <Navbar brand="Got Da Flow"/>
                {errorDisplay}
                <Rules rules={rules}/>
                <RuleForm />
                <JsonInput />
            </div>
        )
    }
} );
