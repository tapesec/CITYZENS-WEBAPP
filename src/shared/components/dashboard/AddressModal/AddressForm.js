import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'rmwc/Button';
import { Typography } from 'rmwc/Typography';
import { Grid, GridCell } from 'rmwc/Grid';
import { TextField } from 'rmwc/TextField';
import { Icon } from 'rmwc/Icon';
import formHelpers from '../../../helpers/form';
import VALIDATION from './../../../constants/dataValidation';
import TextFieldValidationMessages from '../../lib/form/ValidationMessage';

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

const listFieldsAndValidators = [
    {
        name: 'address',
        validator: validateAddress,
    },
];

class AddressForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formValues: {
                address: props.initialValues.address || '',
            },
            validate: {},
        };
        this.fieldConnector = this.fieldConnector.bind(this);
        this.initValidationField = this.initValidationField.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
    }

    fieldConnector(fieldName, fieldValidator) {
        return evt => {
            const newState = formHelpers.validateAndUpdateFieldStateOnChange(
                this.state,
                fieldName,
                fieldValidator,
                evt.target.value,
            );
            this.setState(newState);
        };
    }

    initValidationField(fieldName, fieldValidator) {
        return () => {
            const newState = formHelpers.validateAndUpdateFieldStateOnBlur(
                this.state,
                fieldName,
                fieldValidator,
            );
            this.setState(newState);
        };
    }

    formSubmit(evt) {
        // function may starts here
        const formStatus = formHelpers.formStatusBeforeSubmit(this.state, listFieldsAndValidators);
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
                            outlined
                            value={this.state.formValues.address}
                            onChange={this.fieldConnector('address', validateAddress)}
                            onBlur={this.initValidationField('address', validateAddress)}
                            invalid={
                                this.state.validate.address && !this.state.validate.address.isValid
                            }
                        />
                        {this.state.validate.address &&
                        this.state.validate.address.isValid === false ? (
                            <TextFieldValidationMessages
                                messages={this.state.validate.address.messages}
                            />
                        ) : null}
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
    }).isRequired,
    meta: PropTypes.object, // eslint-disable-line
};

/* AddressForm.defaultProps = {
    initialValues: {
        address: 'test',
        email: 'bof',
    },
}; */

export default AddressForm;
