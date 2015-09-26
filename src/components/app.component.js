import React from 'react';
import FlowStore from '../stores/flow.store';
import Rules from './rules.component';
import RuleForm from './ruleform.component';
import JsonInput from './jsoninput.component';
import Results from './results.component';
import {Navbar} from 'react-bootstrap';

export default React.createClass(
{


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
    

    render()
    {   
        var rules        = this.state.flow.rules.getRules();
        var error        = this.state.flow.error;
        var results      = this.state.flow.results;
        var rulesDisplay = rules.length ? <Rules rules={rules} /> : false;

        return (
            <div className="container">
                <Navbar brand="Got Da Flow"/>
                {rulesDisplay}
                <RuleForm error={this.state.flow.error}/>
                <JsonInput />
                <Results results={results} />
            </div>
        )
    }


} );
