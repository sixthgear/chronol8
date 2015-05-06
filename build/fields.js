var SelectField = React.createClass({displayName: "SelectField",

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
            React.createElement("div", {className: "btn-group-vertical work", role: "group"}, 
                this.props.options.map(function(option, i) {

                    var classes = React.addons.classSet({
                        'btn': true,
                        'btn-default': true,
                        'selected': select.props.selected == option.id
                    });

                    return React.createElement("button", {
                        key: option.id, 
                        type: "button", 
                        className: classes, 
                        onClick: select.onChange.bind(select, option.id)}, option.name);
                })
            )
        );
    }
});


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


var ClearButton = React.createClass({displayName: "ClearButton",

    render: function() {
        return (
            React.createElement("button", {type: "reset", className: "btn btn-default btn-lg", onClick: this.props.onClick}, "Clear")
        );
    }
});


var SubmitButton = React.createClass({displayName: "SubmitButton",

    render: function() {
        var classes = "btn btn-primary btn-lg pull-right";
        if (this.props.disabled)
            classes += " disabled";

        return (
            React.createElement("button", {type: "submit", className: classes}, 
                this.props.label
            )
        );
    }
});
