import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'rmwc/Button';
import reduxForm from 'redux-form/lib/reduxForm';
import Field from 'redux-form/lib/Field';
import { Typography } from 'rmwc/Typography';
import VALIDATION from './../../../constants/dataValidation';
import { renderCustomTextField, renderCustomSwitch } from './../../lib/form/customComponents';
import renderWysiwygComponent from './../../lib/form/WysiwygTextArea';

const validate = values => {
    const errors = {};
    if (!values.title) {
        errors.title = VALIDATION.ALL.LABEL.ERROR;
    }
    if (values.title && values.title.length > VALIDATION.HOTSPOT.TITLE.MAX_LENGTH) {
        errors.title = VALIDATION.HOTSPOT.TITLE.LABEL.ERROR;
    }
    return errors;
};

const WallHotspotForm = ({ handleSubmit, dismissModal }) => (
    <form className="HotspotForm cityzen-form" onSubmit={handleSubmit}>
        <Typography
            style={{ textAlign: 'center' }}
            tag="h2"
            use="headline"
            theme="text-on-primary-background">
            {"Création de votre nouveau point d'interêt"}
        </Typography>
        <Field name="title" label="Choisissez bien le titre:)" component={renderCustomTextField} />
        <Field
            name="scope"
            labelOn="Privée"
            labelOff="Public"
            cssClass="scope-switch-input"
            component={renderCustomSwitch}
        />
        <Field
            name="messageTitle"
            label="Le titre de votre premier message"
            component={renderCustomTextField}
        />
        <Field name="messageBody" label="Exprimez vous …" component={renderWysiwygComponent} />
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

WallHotspotForm.propTypes = {
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
})(WallHotspotForm);
