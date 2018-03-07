import React from 'react';
import PropTypes from 'prop-types';
import reduxForm from 'redux-form/lib/reduxForm';
import Field from 'redux-form/lib/Field';
import { Button } from 'rmwc/Button';
import {
    renderCustomTextField,
    renderCustomTextArea,
    renderCustomSwitch,
} from './../../../../lib/form/customComponents';

import './HotspotMessage.scss';
import './MessageForm.scss';

const HotspotForm = ({ clearHotspotMessageEdition, handleSubmit }) => (
    <article className="HotspotMessage WallHotspotMessageForm">
        <form className="cityzen-form" onSubmit={handleSubmit}>
            <Field
                name="title"
                label="Vous pouvez mettre un titre"
                component={renderCustomTextField}
            />
            <Field
                name="pinned"
                labelOn="Epinglé"
                labelOff="Pas épinglé"
                cssClass="pinned-switch-input"
                component={renderCustomSwitch}
            />
            <Field name="body" label="Exprimez vous …" component={renderCustomTextArea} />
            <div className="submitArea">
                <Button type="submit" raised theme="secondary-bg text-primary-on-secondary">
                    {'Modifiez'}
                </Button>
                <Button
                    type="button"
                    onClick={clearHotspotMessageEdition}
                    raised
                    theme="secondary-bg text-primary-on-secondary">
                    {'Annuler'}
                </Button>
            </div>
        </form>
    </article>
);

HotspotForm.propTypes = {
    clearHotspotMessageEdition: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};

const withReduxForm = reduxForm({
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
    forceUnregisterOnUnmount: false,
    form: 'hotspotMessageForm',
    shouldError: ({ props }) => props.invalid,
    // validate,
})(HotspotForm);

export default withReduxForm;
