import React from 'react';
import FlowStore from '../stores/flow.store';
import RuleForm from './ruleform.component';
import JsonInput from './jsoninput.component';
import Results from './results.component';
import {Navbar} from 'react-bootstrap';

export default React.createClass(
{


    /**
     * Creates the initial state of the component
     *
     * @return  obj                                     component state
     */
    getInitialState()
    {
        return {
            flow : FlowStore.getFlow()
        }
    },


    /**
     * Binds a change listener to the flow store so the component will update
     * when the store emits a change event
     *
     * @return  void
     */
    componentDidMount()
    {
        FlowStore.addChangeListener( this._onChange );
    },


    /**
     * Updates the state of the application when the flow store emits a change
     *
     * @return  void
     */
    _onChange()
    {
        this.setState( this.getInitialState() );
    },
    

    /**
     * Renders the component
     *
     * @return  JSX                                     component markup
     */
    render()
    {   
        var rules        = this.state.flow.rules.getRules();
        var error        = this.state.flow.error;
        var results      = this.state.flow.results;

        return (
            <div className="container">
                <Navbar brand="Got Da Flow"/>
                <RuleForm error={this.state.flow.error}/>
                <JsonInput rules={rules}/>
                <Results results={results} />
            </div>
        )
    }


} );
