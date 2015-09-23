import React from 'react';
import {Alert} from 'react-bootstrap';

export default React.createClass(
{
    propTypes:
    {
        error : React.PropTypes.oneOfType(
        [
            React.PropTypes.number, React.PropTypes.string
        ] )
    },

    render()
    {


        return (
            <div className="row">
                <div className="col-md-12">
                    <Alert bsStyle="danger">{this.props.error}</Alert>
                </div>
            </div>

        );
    }
} );
