import React from 'react';
import {ListGroup, ListGroupItem, Well, ButtonInput} from 'react-bootstrap';
import {resetRules} from '../action-creators';

export default React.createClass(
{

    /**
     * The properties this component expects and their types
     *
     * @var     obj
     */
    propTypes:
    {
        rules : React.PropTypes.array.isRequired
    },


    /**
     * Gets the markup to render for a single rule
     *
     * @param   obj                 ruleInfo            rule information
     *
     * @return  JSX                                     rule markup
     */
    _getRule( ruleInfo )
    {
        return <ListGroupItem
                        key={ruleInfo.id}
                        header={'#' + ruleInfo.id + ' ' + ruleInfo.title}>
                        <code>{ruleInfo.body}</code>
                    </ListGroupItem>
    },
    

    /**
     * Renders the component
     *
     * @return  JSX                                     component markup
     */
    render()
    {
        var rules       = this.props.rules.map( this._getRule );

        var content     = rules.length
                            ? <ListGroup>{rules}</ListGroup>
                            : <Well>No rules yet...</Well>;

        var resetButton = rules.length
                            ?  <ButtonInput
                                    type="submit"
                                    onClick={resetRules}value="reset"
                                    bsSize="large" />
                            : false;
        return (
            <div className="row">
                <div className="col-md-12">
                    <h2 className="page-header">Step 2: Rules <small>Check out the rules that re gonna be executed</small></h2>
                    {content}
                    {resetButton}
                </div>
            </div>
        );
    }
    

} );
