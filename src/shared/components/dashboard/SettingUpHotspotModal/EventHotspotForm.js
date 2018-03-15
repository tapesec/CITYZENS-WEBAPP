import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'rmwc/Button';
import reduxForm from 'redux-form/lib/reduxForm';
import Field from 'redux-form/lib/Field';
import { Typography } from 'rmwc/Typography';
import VALIDATION from './../../../constants/dataValidation';
import {
    renderCustomTextField,
    renderCustomSwitch,
    renderCustomTextArea,
    renderCustomDateTimePicker,
} from './../../lib/form/customComponents';
import constants from './../../../../shared/constants';

const { EDITION_MODE } = constants;

const validate = values => {
    const errors = {};
    if (!values.title) {
        errors.title = VALIDATION.ALL.LABEL.ERROR;
    }
    if (values.title && values.title.length > VALIDATION.HOTSPOT.TITLE.MAX_LENGTH) {
        errors.title = VALIDATION.HOTSPOT.TITLE.LABEL.ERROR;
    }
    if (!values.dateEnd || values.dateEnd === '') errors.dateEnd = VALIDATION.ALL.LABEL.ERROR;
    return errors;
};

/* {
    "cityId": "33273",
    "position": {
      "latitude": 22.12342,
      "longitude": -1.12312
    },
    "address": {
      "city": "Martignas sur Jalles",
      "name": "12 place de l'Eglise"
    },
    "type": "Event",
    "iconType": "EventIcon",
    "title": "Les 10km du moulin Bidon",
    "scope": "private",
    "dateEnd": "2017-12-15T07:39:15.490Z",
    "description": "Les dossards sont à retirer la veille. La course commence à 9h00"
  }, */

const EventHotspotForm = ({ handleSubmit, dismissModal, settingUpMode }) => (
    <form className="HotspotForm cityzen-form" onSubmit={handleSubmit}>
        <Typography
            style={{ textAlign: 'center' }}
            tag="h2"
            use="headline"
            theme="text-on-primary-background">
            {"Création de votre nouveau point d'interêt"}
        </Typography>
        {settingUpMode !== EDITION_MODE.EDITION ? (
            <Field
                name="title"
                label="Choisissez bien le titre:)"
                component={renderCustomTextField}
            />
        ) : null}

        <Field
            name="scope"
            labelOn="Privée"
            labelOff="Public"
            cssClass="scope-switch-input"
            component={renderCustomSwitch}
        />

        <Field
            name="dateEnd"
            label="Renseignez l'heure, par exemple 14:30 ou 09:45"
            component={renderCustomDateTimePicker}
        />

        <Field name="description" label="Exprimez vous …" component={renderCustomTextArea} />
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

EventHotspotForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    dismissModal: PropTypes.func.isRequired,
    settingUpMode: PropTypes.string.isRequired,
};

export default reduxForm({
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
    forceUnregisterOnUnmount: false,
    form: 'eventHotspotForm',
    shouldError: ({ props }) => props.invalid,
    validate,
})(EventHotspotForm);