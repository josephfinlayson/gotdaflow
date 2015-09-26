import React from 'react';
import {addRule} from '../action-creators';
import {Alert, Input, ButtonInput} from 'react-bootstrap';
import {errors} from '../constants/constants';

export default React.createClass(
{

    propTypes :
    {
        rule  : React.PropTypes.object,
        error : React.PropTypes.oneOfType(
        [
            React.PropTypes.number, React.PropTypes.string
        ] )
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

    _onChange( e )
    {
        var stateToSet = {};
        stateToSet[e.target.name] = e.target.value;
        this.setState( stateToSet );
    },


    _onAddClick( e )
    {
        e.preventDefault();
        addRule( this.state );
    },


    render()
    {
        var displayAlert = this.props.error ? <Alert bsStyle="danger">{errors[this.props.error]}</Alert> : false;
        
        return (
            <div className="row">
                <div className="col-md-12">
                    <h2 className="page-header">Step 1: Create a new rule! <small>Don't be shy!</small></h2>
                    {displayAlert}
                    <form>
                        <Input onChange={this._onChange} type="text" name="id" label="Rule id" placeholder="e.g. 12" value={this.state.id} />
                        <Input onChange={this._onChange} type="text" name="title" label="Rule title" placeholder="e.g. Check if the data is relly there" value={this.state.title} />
                        <Input onChange={this._onChange} type="textarea" name="body" label="Rule body" placeholder="e.g. function( data ) { returns data !== false }" value={this.state.body} />
                        <Input onChange={this._onChange} type="text" name="trueResultId" label="If result is true - go to this rule" placeholder="e.g. 233" value={this.state.trueResultId} />
                        <Input onChange={this._onChange} type="text" name="falseResultId" label="if result is false - go to that rule" placeholder="e.g. 342" value={this.state.falseResultId} />
                        <ButtonInput type="submit" onClick={this._onAddClick}value="Add the rule!" bsSize="large" />
                    </form>
                </div>
            </div>
        )
    }


} );
