var LoadingOverlay = React.createClass({displayName: "LoadingOverlay",

    componentDidMount: function() {
        setTimeout(this.props.callback, this.props.delay);
    },

    render: function() {
        return React.createElement("div", {className: "loading"});
    }

});
