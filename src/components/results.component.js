import React from 'react';
import {ListGroup, ListGroupItem} from 'react-bootstrap';

export default React.createClass(
{
    propTypes:
    {
        results : React.PropTypes.array.isRequired
    },

    render()
    {
        var results = this.props.results.map( ( result, i ) =>
        {
            return <ListGroupItem key={i}>{result}</ListGroupItem>
        } );

        return (
            <ListGroup>
                {results}
            </ListGroup>
        );
    }
} );
