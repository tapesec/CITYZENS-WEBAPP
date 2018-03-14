import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'rmwc/Button';
import reduxForm from 'redux-form/lib/reduxForm';
import Field from 'redux-form/lib/Field';
import { Typography } from 'rmwc/Typography';
import VALIDATION from './../../../constants/dataValidation';
import { renderCustomTextArea } from './../../lib/form/customComponents';

const { HOTSPOT } = VALIDATION;

const validate = values => {
    const errors = {};
    if (!values.messageBody) {
        errors.messageBody = VALIDATION.ALL.LABEL.ERROR;
    }
    if (
        values.messageBody &&
        values.messageBody.length > HOTSPOT.ALERT_HOTSPOT.MESSAGE.MAX_LENGTH
    ) {
        errors.messageBody = HOTSPOT.ALERT_HOTSPOT.MESSAGE.LABEL.ERROR;
    }
    return errors;
};

const AlertHotspotForm = ({ handleSubmit, dismissModal }) => (
    <form className="HotspotForm cityzen-form" onSubmit={handleSubmit}>
        <Typography
            style={{ textAlign: 'center' }}
            tag="h2"
            use="headline"
            theme="text-on-primary-background">
            {'Ajouter un signalement'}
        </Typography>
        <Field name="messageBody" label="Que constatez vous ?" component={renderCustomTextArea} />
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

AlertHotspotForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    dismissModal: PropTypes.func.isRequired,
};

export default reduxForm({
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
    forceUnregisterOnUnmount: false,
    form: 'wallHotspotForm',
    shouldError: ({ props }) => props.invalid,
    validate,
})(AlertHotspotForm);
