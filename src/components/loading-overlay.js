var LoadingOverlay = React.createClass({

    componentDidMount: function() {
        setTimeout(this.props.callback, this.props.delay);
    },

    render: function() {
        return <div className="loading"></div>;
    }

});
