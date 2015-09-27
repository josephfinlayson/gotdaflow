import React from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';

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
     * Gets the markup to render for a rule
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
        var rules = this.props.rules.map( this._getRule );

        return (
            <div className="row">
                <div className="md-col-12">
                    <h3>The rules that will be executed:</h3>
                    <ListGroup>
                        {rules}
                    </ListGroup>
                </div>
            </div>
        );
    }
    

} );
