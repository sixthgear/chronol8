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
