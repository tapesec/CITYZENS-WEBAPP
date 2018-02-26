import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { TextField } from 'rmwc/TextField';
import { Button } from 'rmwc/Button';
import ValidationMessages from './../../lib/form/ValidationMessage';
import VALIDATION from './../../../constants/dataValidation';

const validate = values => {
    const errors = {};
    if (values.address && values.address.length > VALIDATION.HOTSPOT.ADDRESS.MAX_LENGTH) {
        errors.address = VALIDATION.HOTSPOT.ADDRESS.LABEL.ERROR;
    }
    return errors;
};

const warn = values => {
    const warnings = {};
    if (!values.address) {
        warnings.address = VALIDATION.HOTSPOT.ADDRESS.LABEL.WARNING;
    }
    return warnings;
};

const renderCustomInput = withValidationMessages => field => (
    <Fragment>
        <TextField
            theme="text-on-primary-background"
            label="Modifiez là si nécessaire"
            {...field.input}
        />
        {withValidationMessages({ ...field.meta })}
    </Fragment>
);

const AddressForm = ({ handleSubmit, dismissModal }) => (
    <form className="AddressForm cityzen-form" onSubmit={handleSubmit}>
        <Field name="address" component={renderCustomInput(ValidationMessages)} />
        <div className="submitArea">
            <Button type="submit" raised theme="secondary-bg text-primary-on-secondary">
                {"C'est bon !"}
            </Button>
            <Button
                type="button"
                onClick={dismissModal}
                raised
                theme="secondary-bg text-primary-on-secondary">
                {'Annuler'}
            </Button>
        </div>
    </form>
);

AddressForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    dismissModal: PropTypes.func.isRequired,
    meta: PropTypes.object, // eslint-disable-line
};

export default reduxForm({
    enableReinitialize: true,
    form: 'addressHotspot',
    validate,
    warn,
})(AddressForm);
