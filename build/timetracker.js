var TimeTrackerApp = React.createClass({displayName: "TimeTrackerApp",

    STATE: {
        SUBMIT: 1,
        SUCCESS: 2
    },

    getInitialState: function() {
        return {
            scr: this.STATE.SUBMIT,
            loading: false,
            email: "",
            time: 0,
        }
    },

    // called when form is submitted
    submit: function(event) {

        event.preventDefault();

        // invalid form
        if (!this.refs.submit.isValid())
            return

        // update state
        this.setState({
            loading: true,
            email: this.refs.submit.state.email,
            time: this.state.time + this.refs.submit.state.time,
        });
    },

    success: function() {
        this.setState({
            loading: false,
            scr: this.STATE.SUCCESS,
        });
    },

    restart: function(event) {
        event.preventDefault();
        this.setState({
            loading: false,
            scr: this.STATE.SUBMIT
        });
    },

    render: function() {

        var scr, overlay;

        if (this.state.scr == this.STATE.SUBMIT)
            scr = React.createElement(SubmitScreen, {ref: "submit", email: this.state.email, onSubmit: this.submit});

        else if (this.STATE.SUCCESS)
            scr = React.createElement(SuccessScreen, {ref: "success", email: this.state.email, time: this.state.time, onSubmit: this.restart});

        if (this.state.loading)
            overlay = React.createElement(LoadingOverlay, {callback: this.success, delay: 1000})

        return (
            React.createElement("div", null, 
                React.createElement("div", {className: "container"}, scr), 
                overlay
            )
        );
    }
});


var LoadingOverlay = React.createClass({displayName: "LoadingOverlay",
    componentDidMount: function() {
        setTimeout(this.props.callback, this.props.delay);
    },
    render: function() {
        return React.createElement("div", {className: "loading"});
    }
});

React.render(React.createElement(TimeTrackerApp, null), document.body);
