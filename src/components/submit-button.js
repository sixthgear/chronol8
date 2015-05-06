var SubmitButton = React.createClass({

    render: function() {
        var classes = "btn btn-primary btn-lg pull-right";
        if (this.props.disabled)
            classes += " disabled";

        return (
            <button type="submit" className={classes}>
                {this.props.label}
            </button>
        );
    }
});
