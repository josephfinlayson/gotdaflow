import React from 'react';
import {Alert} from 'react-bootstrap';
import {errors} from '../constants/constants';



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
                    <Alert bsStyle="danger">{errors[this.props.error]}</Alert>
                </div>
            </div>

        );
    }


} );
