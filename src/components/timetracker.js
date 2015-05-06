var TimeTrackerApp = React.createClass({

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
            scr = <SubmitScreen ref="submit" email={this.state.email} onSubmit={this.submit} />;

        else if (this.STATE.SUCCESS)
            scr = <SuccessScreen ref="success" email={this.state.email} time={this.state.time} onSubmit={this.restart} />;

        if (this.state.loading)
            overlay = <LoadingOverlay callback={this.success} delay={1000} />

        return (
            <div>
                <div className="container">{scr}</div>
                {overlay}
            </div>
        );
    }
});


var LoadingOverlay = React.createClass({
    componentDidMount: function() {
        setTimeout(this.props.callback, this.props.delay);
    },
    render: function() {
        return <div className="loading"></div>;
    }
});

React.render(<TimeTrackerApp />, document.body);
