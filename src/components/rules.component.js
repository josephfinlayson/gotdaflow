import React from 'react';

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
            return (<li key={rule.id}>{rule.title}</li>)
        } );

        return (
            <ul>
                {rules}
            </ul>
        );
    }
} );
