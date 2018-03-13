import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { TextField } from 'rmwc/TextField';
import { Switch } from 'rmwc/Switch';
import moment from 'moment';
import InputMoment from 'input-moment';
import './../../../../../node_modules/input-moment/dist/input-moment.css';
import ValidationMessage from './ValidationMessage';
// import CityzensDatePicker from './cityzensDatePicker/CityzensDatePicker';

export const renderCustomTextField = field => (
    <Fragment>
        <TextField theme="text-on-primary-background" label={field.label} {...field.input} />
        <ValidationMessage {...field.meta} />
    </Fragment>
);

export const renderCustomTextArea = field => (
    <Fragment>
        <TextField
            theme="text-on-primary-background"
            label={field.label}
            {...field.input}
            textarea
            fullwidth
            rows="16"
        />
        <ValidationMessage {...field.meta} />
    </Fragment>
);

export const renderCustomSwitch = field => (
    <div className={field.cssClass}>
        <Switch label={field.input.value ? field.labelOn : field.labelOff} {...field.input} />
        <ValidationMessage {...field.meta} />
    </div>
);

/* export const renderCustonDatePicker = field => (
    <CityzensDatePicker
        value={field.input.value}
        onChange={field.input.onChange}
        placeholder={field.label}
    />
); */

export class renderCustomDateTimePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            textFieldFocused: false,
        };
        if (props.input.value) {
            this.state.m = moment(props.input.value);
            this.state.value = props.input.value;
        } else {
            this.state.m = moment();
            this.state.value = '';
        }
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleFieldClick = this.handleFieldClick.bind(this);
    }

    handleOnChange(m) {
        this.setState({ m, value: m.format('DD/MM/YYYY à hh:mm') });
        if (!this.state.textFieldFocused) {
            this.textField.mdcRootElement.childNodes[0].focus();
        }
    }

    handleSave() {
        this.setState({
            value: this.state.m.format('DD/MM/YYYY à hh:mm'),
        });
        this.props.input.onChange(this.state.m.toISOString());
        this.setState({
            isOpen: false,
        });
    }

    handleFieldClick() {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }

    render() {
        return (
            <Fragment>
                <TextField
                    ref={input => {
                        this.textField = input;
                    }}
                    onClick={this.handleFieldClick}
                    theme="text-on-primary-background"
                    label="Date de l'évenement ?"
                    value={this.state.value}
                    onChange={() => {}}
                />
                <ValidationMessage {...this.props.meta} />
                {this.state.isOpen ? (
                    <InputMoment
                        moment={this.state.m}
                        onChange={this.handleOnChange}
                        onSave={this.handleSave}
                        minStep={1} // default
                        hourStep={1} // default
                        prevMonthIcon="ion-ios-arrow-left" // default
                        nextMonthIcon="ion-ios-arrow-right" // default
                    />
                ) : null}
            </Fragment>
        );
    }
}

renderCustomDateTimePicker.propTypes = {
    input: PropTypes.shape({
        value: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
    }).isRequired,
    meta: PropTypes.shape({}).isRequired,
};
