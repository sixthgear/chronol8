var ClearButton = React.createClass({

    render: function() {
        return (
            <button type="reset" className="btn btn-default btn-lg" onClick={this.props.onClick}>Clear</button>
        );
    }

});
