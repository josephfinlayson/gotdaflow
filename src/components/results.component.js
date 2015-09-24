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
            <div className="row">
                <div className="col-md-12">
                    <h2 className="page-header">Step 3: Results <small>They will show after you execute...</small></h2>
                    <ListGroup>
                        {results}
                    </ListGroup>
                </div>
            </div>
        );
    }
} );
