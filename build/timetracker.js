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

var SubmitScreen = React.createClass({displayName: "SubmitScreen",

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
            fields: []
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

        var email = React.createElement(TextField, {ref: "email", name: "email", onChange: this.handleEmailChange, value: this.state.email});
        var time = React.createElement(TextField, {ref: "time", name: "time", onChange: this.handleTimeChange, value: this.state.time});
        var message = React.createElement(TextField, {ref: "message", name: "message (optional)", onChange: this.handleMessageChange, value: this.state.message});
        var work = React.createElement(SelectField, {ref: "work", name: "work", selected: this.state.work, options: this.workOptions, onChange: this.handleWorkChange, value: this.state.work});

        return (
            React.createElement("form", {onSubmit: this.props.onSubmit}, 

                React.createElement("h1", null, "Submit Timesheet"), 

                email, 
                time, 
                message, 

                React.createElement("p", null, "What type of work is this for?"), 
                work, 

                React.createElement("div", {className: "row"}, 
                React.createElement("div", {className: "col-xs-6"}, 
                    React.createElement(ClearButton, {onClick: this.reset})
                ), 
                React.createElement("div", {className: "col-xs-6"}, 
                    React.createElement(SubmitButton, {disabled: !this.isValid(), label: "Next"})
                )
                )

            )
        );
    }
});

var SuccessScreen = React.createClass({displayName: "SuccessScreen",
    render: function() {

        var hours = Math.floor(this.props.time / 60);
        var minutes = this.props.time % 60;

        return (
            React.createElement("div", null, 
                React.createElement("form", {onSubmit: this.props.onSubmit}, 

                    React.createElement("h1", null, "Timesheet Submitted"), 

                    React.createElement("p", null, "Thank you ", React.createElement("b", null, this.props.email), "."), 
                    React.createElement("p", null, "You have logged ", hours, "h and ", minutes, "min of work today."), 

                    React.createElement(SubmitButton, {disabled: false, label: "Start Again"})
                )
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


var ClearButton = React.createClass({displayName: "ClearButton",

    render: function() {
        return (
            React.createElement("button", {type: "reset", className: "btn btn-default btn-lg", onClick: this.props.onClick}, "Clear")
        );
    }
});

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

var SelectField = React.createClass({displayName: "SelectField",

    getInitialState: function() {
        return {
            isValid: false,
            isError: false
        }
    },

    onChange: function(id) {
        this.props.onChange(id);
    },

    render: function() {

        var select = this;

        return (
            React.createElement("div", {className: "btn-group-vertical work", role: "group"}, 
                this.props.options.map(function(option, i) {

                    var classes = React.addons.classSet({
                        'btn': true,
                        'btn-default': true,
                        'selected': select.props.selected == option.id
                    });

                    return React.createElement("button", {
                        key: option.id, 
                        type: "button", 
                        className: classes, 
                        onClick: select.onChange.bind(select, option.id)}, option.name);
                })
            )
        );
    }
});

var TextField = React.createClass({displayName: "TextField",

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
            React.createElement("div", {className: classes}, 
                React.createElement("input", {
                    type: "text", 
                    className: "form-control", 
                    placeholder: this.props.name, 
                    defaultValue: this.props.value, 
                    onChange: this.props.onChange}), 
                React.createElement("span", {className: icon, "aria-hidden": "true"})
            )
        );
    }
});


React.render(React.createElement(TimeTrackerApp, null), document.body);
