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
            time: "",
        }
    },

    submit: function(event) {
        event.preventDefault();

        // invalid form
        if (!this.refs.submit.isValid())
            return

        // update state
        this.setState({
            loading: true,
            email: this.refs.submit.state.email,
            time: this.refs.submit.state.time,
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

var SubmitScreen = React.createClass({

    workOptions: [
        'Time working on visual effects for a movie',
        'Time spent reviewing the work of a junior artist'
    ],

    getInitialState: function() {
        return {
            email: this.props.email,
            time: "",
            message: "",
            work: "",
            fields: []
        }
    },

    isValid: function() {
        return (
            !this.refs.email.state.isError &&
            !this.refs.time.state.isError &&
            !this.refs.message.state.isError &&
            !this.refs.work.state.isError
        )
    },

    reset: function(event) {
        this.replaceState(this.getInitialState());
    },

    handleEmailChange: function() {

        var re = new RegExp("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$");
        var email = event.target.value;
        var valid = re.test(email);

        this.refs.email.setState({
            isValid: email.length > 0 && valid,
            isError: email.length > 0 && !valid
        });

        this.setState({email: email});

    },

    handleTimeChange: function() {
        this.setState({email: event.target.value});
    },

    handleMessageChange: function() {
        this.setState({email: event.target.value});
    },

    handleWorkChange: function() {
        this.setState({email: event.target.value});
    },

    render: function() {

        var email = <TextField ref="email" name="email" onChange={this.handleEmailChange} value={this.state.email} />;
        var time = <TextField ref="time" name="time" onChange={this.handleTimeChange} value={this.state.time} />;
        var message = <TextField ref="message" name="message" onChange={this.handleMessageChange} value={this.state.message}/>;
        var work = <SelectField ref="work" name="work" options={this.workOptions} onChange={this.handleWorkChange} value={this.state.work} />;

        return (
            <form onSubmit={this.props.onSubmit}>

                <h1>Submit Timesheet</h1>

                {email}
                {time}
                {message}

                <p>What type of work is this for?</p>
                {work}

                <div className="row">
                <div className="col-xs-6">
                    <ClearButton onClick={this.reset}/>
                </div>
                <div className="col-xs-6">
                    <SubmitButton label="Next"/>
                </div>
                </div>

            </form>
        );
    }
});

var SuccessScreen = React.createClass({
    render: function() {
        return (
            <div>
                <form onSubmit={this.props.onSubmit}>

                    <h1>Timesheet Submitted</h1>

                    <p>Thank you <b>{this.props.email}</b>.</p>
                    <p>You have logged {this.props.hours}h and {this.props.minutes}min of work today.</p>

                    <SubmitButton label="Start Again" />
                </form>
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


var ClearButton = React.createClass({

    render: function() {
        return (
            <button type="reset" className="btn btn-default btn-lg" onClick={this.props.onClick}>Clear</button>
        );
    }
});

var SubmitButton = React.createClass({

    render: function() {
        return (
            <button type="submit" className="btn btn-primary btn-lg pull-right">
                {this.props.label}
            </button>
        );
    }
});

var SelectField = React.createClass({

    getInitialState: function() {
        return {
            isValid: false,
            isError: false
        }
    },

    render: function() {
        return (
            <div className="btn-group-vertical work" role="group" aria-label="...">
                {this.props.options.map(function(option) {
                    return <button type="button" className="btn btn-default">{option}</button>;
                })}
            </div>
        );
    }
});

var TextField = React.createClass({

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
            <div className={classes}>
                <input
                    type="text"
                    className="form-control"
                    placeholder={this.props.name}
                    defaultValue={this.props.value}
                    onChange={this.props.onChange} />
                <span className={icon} aria-hidden="true"></span>
            </div>
        );
    }
});


React.render(<TimeTrackerApp />, document.body);
