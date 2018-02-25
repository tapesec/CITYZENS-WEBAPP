import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { TextField } from 'rmwc/TextField';
import { Button } from 'rmwc/Button';

const renderCustomInput = field => (
    <TextField
        theme="text-on-primary-background"
        label="Modifiez là si nécessaire"
        {...field.input}
    />
);

const AddressForm = ({ handleSubmit, dismissModal }) => (
    <form className="mdc-form-field AddressForm" onSubmit={handleSubmit}>
        <Field name="address" component={renderCustomInput} />
        <div className="submitArea">
            <Button type="submit" raised theme="secondary-bg text-primary-on-secondary">
                {"C'est bon !"}
            </Button>
            <Button type="button" onClick={dismissModal} raised theme="secondary-bg text-primary-on-secondary">
                {'Annuler'}
            </Button>
        </div>
    </form>
);

AddressForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    dismissModal: PropTypes.func.isRequired,
};

export default reduxForm({
    enableReinitialize: true,
    form: 'addressHotspot',
})(AddressForm);
