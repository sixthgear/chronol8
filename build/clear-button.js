var ClearButton = React.createClass({displayName: "ClearButton",

    render: function() {
        return (
            React.createElement("button", {type: "reset", className: "btn btn-default btn-lg", onClick: this.props.onClick}, "Clear")
        );
    }

});
