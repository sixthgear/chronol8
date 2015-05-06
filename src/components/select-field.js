var SelectField = React.createClass({

    getInitialState: function() {
        return {
            isValid: false,
            isError: false
        }
    },

    onChange: function(id) {
        this.props.onChange(id);
    },

    render: function() {

        var select = this;

        return (
            <div className="btn-group-vertical work" role="group">
                {this.props.options.map(function(option, i) {

                    var classes = React.addons.classSet({
                        'btn': true,
                        'btn-default': true,
                        'selected': select.props.selected == option.id
                    });

                    return <button
                        key={option.id}
                        type="button"
                        className={classes}
                        onClick={select.onChange.bind(select, option.id)}>{option.name}</button>;
                })}
            </div>
        );
    }
});
