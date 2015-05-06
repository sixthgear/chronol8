var TextField = React.createClass({displayName: "TextField",

    getInitialState: function() {
        return {
            isValid: false,
            isError: false
        }
    },

    render: function() {

        var classes = React.addons.classSet({
            'form-group':   true,
            'has-feedback': true,
            'has-success':  this.state.isValid,
            'has-error':    this.state.isError,
        });

        var icon = 'form-control-feedback glyphicon ';

        if (this.state.isValid)
            icon += 'glyphicon-ok';

        else if (this.state.isError)
            icon += 'glyphicon-remove';

        return (
            React.createElement("div", {className: classes}, 
                React.createElement("input", {
                    type: "text", 
                    className: "form-control", 
                    placeholder: this.props.name, 
                    defaultValue: this.props.value, 
                    onChange: this.props.onChange}), 
                React.createElement("span", {className: icon, "aria-hidden": "true"})
            )
        );
    }
});
