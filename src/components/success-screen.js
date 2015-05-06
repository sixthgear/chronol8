var SuccessScreen = React.createClass({
    render: function() {

        var hours = Math.floor(this.props.time / 60);
        var minutes = this.props.time % 60;

        return (
            <div>
                <form onSubmit={this.props.onSubmit}>

                    <h1>Timesheet Submitted</h1>

                    <p>Thank you <b>{this.props.email}</b>.</p>
                    <p>You have logged {hours}h and {minutes}min of work today.</p>

                    <SubmitButton disabled={false} label="Start Again" />
                </form>
            </div>
        );
    }
});
