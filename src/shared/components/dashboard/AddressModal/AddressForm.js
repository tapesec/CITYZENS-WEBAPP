import React /* , { Fragment } */ from 'react';
import PropTypes from 'prop-types';
import { Button } from 'rmwc/Button';
import { Typography } from 'rmwc/Typography';
import { Grid, GridCell } from 'rmwc/Grid';
import { TextField, TextFieldHelperText } from 'rmwc/TextField';
import { Icon } from 'rmwc/Icon';
import VALIDATION from './../../../constants/dataValidation';

const validateAddress = values => {
    const errors = {
        isValid: true,
        messages: [],
    };
    if (!values.address) {
        errors.isValid = false;
        errors.messages.push(VALIDATION.ALL.LABEL.ERROR);
    }
    if (values.address && values.address.length > VALIDATION.HOTSPOT.ADDRESS.MAX_LENGTH) {
        errors.isValid = false;
        errors.messages.push(VALIDATION.HOTSPOT.ADDRESS.LABEL.ERROR);
    }
    return errors;
};

const validateEmail = values => {
    const errors = {
        isValid: true,
        messages: [],
    };
    if (!values.email) {
        errors.isValid = false;
        errors.messages.push(VALIDATION.ALL.LABEL.ERROR);
    }
    if (values.email && values.email.length > 2) {
        errors.isValid = false;
        errors.messages.push(VALIDATION.HOTSPOT.ADDRESS.LABEL.ERROR);
    }
    return errors;
};

const validateAndUpdateFieldStateOnChange = (formState, fieldName, fieldValidator, inputValue) => {
    const newState = {};
    newState.formValues = {
        ...formState.formValues,
        [fieldName]: inputValue,
    };
    if (formState.validate[fieldName] && formState.validate[fieldName].touched) {
        const validateObject = fieldValidator(newState.formValues);
        newState.validate = {
            ...formState.validate,
            [fieldName]: {
                touched: true,
                ...validateObject,
            },
        };
    }
    return newState;
};

const validateAndUpdateFieldStateOnBlur = (formState, fieldName, fieldValidator) => {
    const newState = {};
    const validateObject = fieldValidator(formState.formValues);
    const newFieldStatus = {
        ...validateObject,
        touched: true,
    };
    newState.validate = {
        ...formState.validate,
        [fieldName]: newFieldStatus,
    };
    return newState;
};

const listFieldsAndValidators = [
    {
        name: 'address',
        validator: validateAddress,
    },
    {
        name: 'email',
        validator: validateEmail,
    },
];

const formStatusBeforeSubmit = (formState, fieldsAndValidators) => {
    const newFormState = { ...formState };
    fieldsAndValidators.forEach(currentField => {
        const validateObject = currentField.validator(formState.formValues);
        newFormState.validate[currentField.name] = {
            ...validateObject,
            touched: true,
        };
    });
    const isInvalid = fieldsAndValidators.some(currentField => {
        const validateObject = currentField.validator(formState.formValues);
        return validateObject.isValid === false;
    });
    return {
        isValid: !isInvalid,
        newStateToUpdate: newFormState,
    };
};

class AddressForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formValues: {
                address: props.initialValues.address || '',
                email: props.initialValues.email || '',
            },
            validate: {},
        };
        this.fieldConnector = this.fieldConnector.bind(this);
        this.initValidationField = this.initValidationField.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
    }

    fieldConnector(fieldName, fieldValidator) {
        return evt => {
            const newState = validateAndUpdateFieldStateOnChange(
                this.state,
                fieldName,
                fieldValidator,
                evt.target.value,
            );
            console.log(newState, 'newState on change');
            this.setState(newState);
        };
    }

    initValidationField(fieldName, fieldValidator) {
        return () => {
            const newState = validateAndUpdateFieldStateOnBlur(
                this.state,
                fieldName,
                fieldValidator,
            );
            console.log(newState, 'newState after blur');
            this.setState(newState);
        };
    }

    formSubmit(evt) {
        // function may starts here
        const formStatus = formStatusBeforeSubmit(this.state, listFieldsAndValidators);
        console.log(this.state, 'this.state');
        if (formStatus.isValid === false) {
            evt.preventDefault();
            this.setState(formStatus.newStateToUpdate);
            return false;
        }
        this.props.onSubmit(this.state.formValues);
        return true;
    }

    render() {
        const { dismissModal, subtitle, inputLabel } = this.props;
        return (
            <form className="AddressForm" onSubmit={this.formSubmit}>
                <Grid>
                    <GridCell span="12" phone="12" tablet="12">
                        <Typography tag="h2" theme="text-on-primary-background" use="headline5">
                            <Icon theme="text-icon-on-background" strategy="ligature">
                                add_location
                            </Icon>
                            {"Nouveau point d'interêt"}
                        </Typography>
                        <Typography tag="h3" theme="text-on-primary-background" use="subtitle1">
                            {subtitle}
                        </Typography>
                    </GridCell>
                    <GridCell span="12" phone="12" tablet="12">
                        <TextField
                            className="cyz-text-field"
                            theme="text-on-primary-background"
                            label={inputLabel}
                            value={this.state.formValues.address}
                            onChange={this.fieldConnector('address', validateAddress)}
                            onBlur={this.initValidationField('address', validateAddress)}
                            invalid={
                                this.state.validate.address && !this.state.validate.address.isValid
                            }
                        />
                        {this.state.validate.address &&
                        this.state.validate.address.isValid === false
                            ? this.state.validate.address.messages.map(message => (
                                  <TextFieldHelperText
                                      style={{ color: 'red' }}
                                      validationMsg
                                      key={message}>
                                      <Icon
                                          strategy="ligature"
                                          style={{ verticalAlign: 'middle', fontSize: '0.75rem' }}>
                                          close
                                      </Icon>
                                      {message}
                                  </TextFieldHelperText>
                              ))
                            : null}
                        <TextField
                            className="cyz-text-field"
                            theme="text-on-primary-background"
                            label={inputLabel}
                            value={this.state.formValues.email}
                            onChange={this.fieldConnector('email', validateEmail)}
                            onBlur={this.initValidationField('email', validateEmail)}
                            invalid={
                                this.state.validate.email && !this.state.validate.email.isValid
                            }
                        />
                        {this.state.validate.email && this.state.validate.email.isValid === false
                            ? this.state.validate.email.messages.map(message => (
                                  <TextFieldHelperText
                                      style={{ color: 'red' }}
                                      validationMsg
                                      key={message}>
                                      <Icon
                                          strategy="ligature"
                                          style={{ verticalAlign: 'middle', fontSize: '0.75rem' }}>
                                          close
                                      </Icon>
                                      {message}
                                  </TextFieldHelperText>
                              ))
                            : null}
                    </GridCell>
                    <GridCell span="6" phone="12" tablet="12">
                        <Button type="submit" raised theme="secondary-bg text-primary-on-secondary">
                            {"C'est bon !"}
                        </Button>
                    </GridCell>
                    <GridCell span="6" phone="12" tablet="12">
                        <Button
                            type="button"
                            onClick={dismissModal}
                            raised
                            theme="secondary-bg text-primary-on-secondary">
                            {'Annuler'}
                        </Button>
                    </GridCell>
                </Grid>
            </form>
        );
    }
}

AddressForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    dismissModal: PropTypes.func.isRequired,
    subtitle: PropTypes.string.isRequired,
    inputLabel: PropTypes.string.isRequired,
    initialValues: PropTypes.shape({
        address: PropTypes.string,
        email: PropTypes.string,
    }),
    meta: PropTypes.object, // eslint-disable-line
};

AddressForm.defaultProps = {
    initialValues: {
        address: 'test',
        email: 'bof',
    },
};

export default AddressForm;
