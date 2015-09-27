import React from 'react';
import {ListGroup, ListGroupItem, Glyphicon} from 'react-bootstrap';

export default React.createClass(
{
    propTypes:
    {
        results : React.PropTypes.array.isRequired
    },

    render()
    {
        var style;
        var glyph;
        var results = this.props.results.map( ( result, i ) =>
        {
            style = result.passed ? "success" : "warning";
            glyph = result.passed ?  <Glyphicon glyph="ok" /> : <Glyphicon glyph="remove" />;
            return (
                <ListGroupItem bsStyle={style} key={i}>
                    {glyph} Rule #{result.id} {result.title}
                </ListGroupItem>
                );
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
