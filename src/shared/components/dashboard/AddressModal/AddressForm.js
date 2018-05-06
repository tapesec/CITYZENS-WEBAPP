import React /* , { Fragment } */ from 'react';
import PropTypes from 'prop-types';
import reduxForm from 'redux-form/lib/reduxForm';
import Field from 'redux-form/lib/Field';
import { Button } from 'rmwc/Button';
import VALIDATION from './../../../constants/dataValidation';
import { renderCustomTextField } from './../../lib/form/customComponents';

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

const AddressForm = ({ handleSubmit, dismissModal }) => (
    <form className="AddressForm cityzen-form" onSubmit={handleSubmit}>
        <Field
            name="address"
            label="Corrigez l'adresse si inexacte (ne bougera pas le point)"
            component={renderCustomTextField}
        />
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
    shouldError: ({ props }) => props.invalids, // Prevent invalid form submission …
})(AddressForm);
