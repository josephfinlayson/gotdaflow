import React from 'react';
import {ListGroup, ListGroupItem, Glyphicon} from 'react-bootstrap';

export default React.createClass(
{

    /**
     * The properties this component expects and their types
     *
     * @var     obj
     */
    propTypes:
    {
        results : React.PropTypes.array.isRequired
    },


    /**
     * Gets the markup to render for a single result
     *
     * @param   obj                 resultInfo          result information
     *
     * @return  JSX                                     result markup
     */
    _getResult( resultInfo )
    {
        var style = resultInfo.passed ? "success" : "warning";
        var glyph = resultInfo.passed ?  <Glyphicon glyph="ok" /> : <Glyphicon glyph="remove" />;
        return (
            <ListGroupItem bsStyle={style} key={resultInfo.id}>
                {glyph} Rule #{resultInfo.id} {resultInfo.title}
            </ListGroupItem>
            );
    },


    /**
     * Renders the component
     *
     * @return  JSX                                     component markup
     */
    render()
    {
        var results = this.props.results.map( this._getResult );

        // If there are any results, let's also show the "end" results which
        // lets the user know the flow has ended
        if ( results.length )
        {
            results.push( <ListGroupItem key='end'>This is the end. My only friend. The end</ListGroupItem> )   
        }

        return (
            <div className="row">
                <div className="col-md-12">
                    <h2 className="page-header">Step 4: Results <small>They will show after you execute...</small></h2>
                    <ListGroup>
                        {results}
                    </ListGroup>
                </div>
            </div>
        );
    }


} );
