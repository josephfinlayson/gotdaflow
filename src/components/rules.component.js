import React from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';

export default React.createClass(
{
    propTypes:
    {
        rules : React.PropTypes.array.isRequired
    },

    render()
    {
        var rules = this.props.rules.map( ( rule ) =>
        {
            return <ListGroupItem key={rule.id} header={rule.title}><code>{rule.body}</code></ListGroupItem>
        } );

        return (
            <div className="row">
                <div className="md-col-12">
                    <ListGroup>
                        {rules}
                    </ListGroup>
                </div>
            </div>
        );
    }
} );
