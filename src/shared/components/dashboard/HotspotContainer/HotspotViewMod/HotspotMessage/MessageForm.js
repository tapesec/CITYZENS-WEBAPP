import React from 'react';
import PropTypes from 'prop-types';
import reduxForm from 'redux-form/lib/reduxForm';
import Field from 'redux-form/lib/Field';
import { Button } from 'rmwc/Button';
import { renderCustomTextField, renderCustomSwitch } from './../../../../lib/form/customComponents';
import renderWysiwygComponent from './../../../../lib/form/WysiwygTextArea';
import { MESSAGE_FORM } from './../../../../../wording';
import VALIDATION from './../../../../../constants/dataValidation';
import constants from './../../../../../constants';

import './HotspotMessage.scss';
import './MessageForm.scss';

const { EDITION_MODE } = constants;

const validate = values => {
    const errors = {};
    if (!values.title) {
        errors.title = VALIDATION.ALL.LABEL.ERROR;
    }
    if (values.title && values.title.length > VALIDATION.MESSAGE.TITLE.MAX_LENGTH) {
        errors.title = VALIDATION.MESSAGE.TITLE.LABEL.ERROR;
    }
    if (!values.body) {
        errors.body = VALIDATION.ALL.LABEL.ERROR;
    }
    return errors;
};

const MessageForm = ({ clearHotspotMessageEdition, handleSubmit, editionMode }) => (
    <article className="HotspotMessage WallHotspotMessageForm">
        <form className="cityzen-form" onSubmit={handleSubmit}>
            <Field
                name="title"
                label={MESSAGE_FORM.EDITION.TITLE.LABEL}
                component={renderCustomTextField}
            />
            <Field
                name="pinned"
                labelOn={MESSAGE_FORM.EDITION.PINNED.LABEL.ON}
                labelOff={MESSAGE_FORM.EDITION.PINNED.LABEL.OFF}
                cssClass="pinned-switch-input"
                component={renderCustomSwitch}
            />
            <Field
                name="body"
                label={MESSAGE_FORM.EDITION.BODY.LABEL}
                component={renderWysiwygComponent}
            />
            <div className="submitArea">
                <Button type="submit" raised theme="secondary-bg text-primary-on-secondary">
                    {editionMode === EDITION_MODE.SETTING_UP
                        ? MESSAGE_FORM.CREATION.SUBMIT.LABEL
                        : MESSAGE_FORM.EDITION.SUBMIT.LABEL}
                </Button>
                <Button
                    type="button"
                    onClick={clearHotspotMessageEdition}
                    raised
                    theme="secondary-bg text-primary-on-secondary">
                    {MESSAGE_FORM.EDITION.CANCEL.LABEL}
                </Button>
            </div>
        </form>
    </article>
);

MessageForm.propTypes = {
    clearHotspotMessageEdition: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    editionMode: PropTypes.string.isRequired,
};

const withReduxForm = reduxForm({
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
    forceUnregisterOnUnmount: false,
    form: 'hotspotMessageForm',
    shouldError: ({ props }) => props.invalid,
    validate,
})(MessageForm);

export default withReduxForm;
