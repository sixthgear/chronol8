var SubmitScreen = React.createClass({

    workOptions: [
        {id: 1, name: 'Time working on visual effects for a movie'},
        {id: 2, name: 'Time spent reviewing the work of a junior artist'}
    ],

    getInitialState: function() {
        return {
            email: this.props.email,
            time: null,
            message: "",
            work: 1,
        }
    },

    isValid: function() {

        if (typeof this.refs.email == "undefined")
            return false;

        if (typeof this.refs.time == "undefined")
            return false;

        return (
            this.state.email.length > 0 && !this.refs.email.state.isError &&
            this.state.time != null && !this.refs.time.state.isError &&
            !this.refs.message.state.isError &&
            !this.refs.work.state.isError
        )
    },

    reset: function(event) {
        this.replaceState(this.getInitialState());
    },

    handleEmailChange: function(event) {

        // http://www.regular-expressions.info/email.html
        var re = new RegExp("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$");
        var email = event.target.value;
        var valid = re.test(email);

        this.refs.email.setState({
            isValid: email.length > 0 && valid,
            isError: email.length > 0 && !valid
        });

        this.setState({email: email});

    },

    handleTimeChange: function(event) {

        var time = event.target.value.trim();
        var patterns = [
            {
                re: /^(\d+)$/i, // 42
                fn: function(m) { return {hours: 0, minutes: parseInt(m[1])}; }
            },
            {
                re: /^(\d+) *(minutes|mins|min|m)$/i, // 42 min
                fn: function(m) { return {hours: 0, minutes: parseInt(m[1])}; }
            },
            {
                re: /^([\d\.]+) *(hours|hour|hrs|hr|h)$/i, // 2 hours
                fn: function(m) { return {hours: parseFloat(m[1]), minutes: 0}; }
            },
            {
                re: /^(\d+):(\d+)$/, // 7:42
                fn: function(m) { return {hours: parseInt(m[1]), minutes: parseInt(m[2])}; }
            },
            {
                re: /^(\d+) *(hours|hour|hrs|hr|h) *(\d+) *(minutes|mins|min|m)?$/, // 7h 42m
                fn: function(m) { return {hours: parseInt(m[1]), minutes: parseInt(m[3])}; }
            }
        ]

        var result;
        for (p in patterns) {
            var match = patterns[p].re.exec(time);
            if (match) {
                result = patterns[p].fn(match);
                break;
            }
        }

        this.refs.time.setState({
            isValid: time.length > 0 && result != null,
            isError: time.length > 0 && result == null
        });

        if (result)
            this.setState({time: result.hours * 60 + result.minutes});
        else
            this.setState({time: null});
    },

    handleMessageChange: function() {
        this.setState({message: event.target.value});
    },

    handleWorkChange: function(option) {
        this.setState({work: option});
    },

    render: function() {

        var email = <TextField ref="email" name="email" onChange={this.handleEmailChange} value={this.state.email} />;
        var time = <TextField ref="time" name="time" onChange={this.handleTimeChange} value={this.state.time} />;
        var message = <TextField ref="message" name="message (optional)" onChange={this.handleMessageChange} value={this.state.message}/>;
        var work = <SelectField ref="work" name="work" selected={this.state.work} options={this.workOptions} onChange={this.handleWorkChange} value={this.state.work} />;

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
                    <SubmitButton disabled={!this.isValid()} label="Next"/>
                </div>
                </div>

            </form>
        );
    }
});

