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
