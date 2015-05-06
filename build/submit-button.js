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
