import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'rmwc/Button';
import { TextField } from 'rmwc/TextField';
import Typography from 'rmwc/Typography';
import { Switch } from 'rmwc/Switch';
import RenderWysiwygComponent from './../../../../lib/form/WysiwygTextArea';
import formHelpers from '../../../../../helpers/form';
import { MESSAGE_FORM } from './../../../../../wording';
import VALIDATION from './../../../../../constants/dataValidation';
import constants from './../../../../../constants';

import './../HotspotMessage.scss';
import './MessageForm.scss';

const { EDITION_MODE } = constants;

const validateTitle = values => {
    const errors = {
        isValid: true,
        messages: [],
    };
    if (values.messageTitle && values.messageTitle.length > VALIDATION.MESSAGE.TITLE.MAX_LENGTH) {
        errors.isValid = false;
        errors.messages.push(VALIDATION.MESSAGE.TITLE.LABEL.ERROR);
    }
    return errors;
};

const validateBody = values => {
    const errors = {
        isValid: true,
        messages: [],
    };
    if (values.messageBody && values.messageBody.length > VALIDATION.MESSAGE.BODY.MAX_LENGTH) {
        errors.isValid = false;
        errors.messages.push(VALIDATION.MESSAGE.TITLE.LABEL.ERROR);
    }
    return errors;
};

const validatePinned = () => {
    const errors = {
        isValid: true,
        messages: [],
    };
    return errors;
};

const listFieldsAndValidators = [
    {
        name: 'title',
        validator: validateTitle,
    },
    {
        name: 'body',
        validator: validateBody,
    },
    {
        name: 'pinned',
        validator: validatePinned,
    },
];

class MessageForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formValues: {
                title: this.props.initialValues.title || '',
                pinned: this.props.initialValues.pinned || false,
                body: this.props.initialValues.body || '',
                id: this.props.initialValues.id,
            },
            validate: {},
            initialValues: props.initialValues,
        };
        this.fieldConnector = this.fieldConnector.bind(this);
        this.initValidationField = this.initValidationField.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    onCancel() {
        this.props.clearHotspotMessageEdition();
    }

    fieldConnector(fieldName, fieldValidator, options = {}) {
        const that = this;
        return evt => {
            const newState = formHelpers.validateAndUpdateFieldStateOnChange(
                that.state,
                fieldName,
                fieldValidator,
                options.switch ? !that.state.formValues.scope : evt.target.value,
            );
            that.setState(newState);
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
        evt.preventDefault();
        this.props.onSubmit(this.state.formValues);
        return true;
    }

    render() {
        const { editionMode } = this.props;
        return (
            <article className="HotspotMessage WallHotspotMessageForm">
                <form className="cityzen-form" onSubmit={this.formSubmit}>
                    <TextField
                        className="cyz-text-field"
                        theme="text-on-primary-background"
                        label={MESSAGE_FORM.EDITION.TITLE.LABEL}
                        outlined
                        value={this.state.formValues.title}
                        onChange={this.fieldConnector('title', validateTitle)}
                        onBlur={this.initValidationField('title', validateTitle)}
                        invalid={this.state.validate.title && !this.state.validate.title.isValid}
                    />
                    <Switch
                        checked={this.state.formValues.scope}
                        onChange={this.fieldConnector('pinned', validatePinned, { switch: true })}>
                        <Typography
                            style={{ marginLeft: '5px' }}
                            tag="span"
                            use="body2"
                            theme="text-on-primary-background">
                            {MESSAGE_FORM.EDITION.PINNED.LABEL.ON}
                        </Typography>
                    </Switch>
                    <RenderWysiwygComponent
                        value={this.state.formValues.body}
                        onChange={this.fieldConnector('body', validateBody)}
                        placeholder="Exprimez vous..."
                    />
                    <div className="submitArea">
                        <Button type="submit" raised theme="secondary-bg text-primary-on-secondary">
                            {editionMode === EDITION_MODE.SETTING_UP
                                ? MESSAGE_FORM.CREATION.SUBMIT.LABEL
                                : MESSAGE_FORM.EDITION.SUBMIT.LABEL}
                        </Button>
                        <Button
                            type="button"
                            onClick={this.onCancel}
                            raised
                            theme="secondary-bg text-primary-on-secondary">
                            {MESSAGE_FORM.EDITION.CANCEL.LABEL}
                        </Button>
                    </div>
                </form>
            </article>
        );
    }
}
MessageForm.propTypes = {
    clearHotspotMessageEdition: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    editionMode: PropTypes.string.isRequired,
    initialValues: PropTypes.shape({
        title: PropTypes.string,
        id: PropTypes.string,
        pinned: PropTypes.bool,
        body: PropTypes.string,
    }).isRequired,
};

export default MessageForm;
