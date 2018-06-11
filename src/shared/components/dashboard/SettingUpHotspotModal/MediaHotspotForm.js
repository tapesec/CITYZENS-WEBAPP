import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'rmwc/Button';
import { Typography } from 'rmwc/Typography';
import { TextField } from 'rmwc/TextField';
import { Switch } from 'rmwc/Switch';
import VALIDATION from './../../../constants/dataValidation';
import formHelpers from '../../../helpers/form';
import TextFieldValidationMessages from '../../lib/form/ValidationMessage';
import RenderWysiwygComponent from './../../lib/form/WysiwygTextArea';
import ImagesPicker from './../../lib/imagesPicker/ImagesPicker';
import config from '../../../config';

import './MediaHotspotForm.scss';
import ImageCDN from '../../lib/ImageCDN';

const validateTitle = values => {
    const errors = {
        isValid: true,
        messages: [],
    };
    if (!values.title) {
        errors.isValid = false;
        errors.messages.push(VALIDATION.ALL.LABEL.ERROR);
    }
    if (values.title && values.title.length > VALIDATION.HOTSPOT.TITLE.MAX_LENGTH) {
        errors.isValid = false;
        errors.messages.push(VALIDATION.HOTSPOT.TITLE.LABEL.ERROR);
    }
    return errors;
};

const validateAvatarIconUrl = () => {
    const errors = {
        isValid: true,
        messages: [],
    };
    return errors;
};

const validateMessageTitle = values => {
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

const validateMessageBody = values => {
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

const validateScope = () => {
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
        name: 'scope',
        validator: validateScope,
    },
    {
        name: 'messageTitle',
        validator: validateMessageTitle,
    },
    {
        name: 'messageBody',
        validator: validateMessageBody,
    },
    {
        name: 'avatarIconUrl',
        validator: validateAvatarIconUrl,
    },
];

const listIcons = [
    {
        handle: 'AaGzo1a0ShmmL9r8vAhj',
        title: 'Icône information',
    },
    {
        handle: 'QXg7dCRhQbiEi4iRGSDz',
        title: 'Mur de message',
    },
    {
        handle: 'AaGzo1a0ShmmL9r8vAhj',
        title: 'Icône information',
    },
    {
        handle: 'QXg7dCRhQbiEi4iRGSDz',
        title: 'Mur de message',
    },
    {
        handle: 'AaGzo1a0ShmmL9r8vAhj',
        title: 'Icône information',
    },
    {
        handle: 'QXg7dCRhQbiEi4iRGSDz',
        title: 'Mur de message',
    },
    {
        handle: 'QXg7dCRhQbiEi4iRGSDz',
        title: 'Mur de message',
    },
    {
        handle: 'AaGzo1a0ShmmL9r8vAhj',
        title: 'Icône information',
    },
    {
        handle: 'QXg7dCRhQbiEi4iRGSDz',
        title: 'Mur de message',
    },
    {
        handle: 'QXg7dCRhQbiEi4iRGSDz',
        title: 'Mur de message',
    },
    {
        handle: 'AaGzo1a0ShmmL9r8vAhj',
        title: 'Icône information',
    },
    {
        handle: 'QXg7dCRhQbiEi4iRGSDz',
        title: 'Mur de message',
    },
    {
        handle: 'QXg7dCRhQbiEi4iRGSDz',
        title: 'Mur de message',
    },
    {
        handle: 'QXg7dCRhQbiEi4iRGSDz',
        title: 'Mur de message',
    },
    {
        handle: 'AaGzo1a0ShmmL9r8vAhj',
        title: 'Icône information',
    },
    {
        handle: 'QXg7dCRhQbiEi4iRGSDz',
        title: 'Mur de message',
    },
    {
        handle: 'QXg7dCRhQbiEi4iRGSDz',
        title: 'Mur de message',
    },
    {
        handle: 'AaGzo1a0ShmmL9r8vAhj',
        title: 'Icône information',
    },
    {
        handle: 'QXg7dCRhQbiEi4iRGSDz',
        title: 'Mur de message',
    },
];

class MediaHotspotForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formValues: {
                title: '',
                messageTitle: '',
                messageBody: '',
                scope: false,
                avatarIconUrl: config.hotspot.mediaDefaultIcon,
            },
            validate: {},
            initialValues: props.initialValues,
            previewIcon: config.hotspot.mediaDefaultIcon,
        };
        this.fieldConnector = this.fieldConnector.bind(this);
        this.initValidationField = this.initValidationField.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    onCancel() {
        if (this.state.imagePickedHandle) {
            this.props.removeImage(this.state.imagePickedHandle);
        }
        this.props.dismissModal();
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
            if (fieldName === 'avatarIconUrl') {
                const newStateWithAvatarIconUrl = {
                    ...newState,
                    previewIcon: evt.target.value,
                    imagePickedHandle: that.state.imagePickedHandle,
                };
                if (that.state.imagePickedHandle) {
                    this.props.removeImage(that.state.imagePickedHandle);
                    newStateWithAvatarIconUrl.imagePickedHandle = undefined;
                }
                if (options.uploader) {
                    newStateWithAvatarIconUrl.imagePickedHandle = evt.target.value;
                }
                that.setState(newStateWithAvatarIconUrl);
            } else that.setState(newState);
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
        const { initialValues } = this.props;
        const labelFieldSetCreation = "Création de votre nouveau point d'interêt";
        const privateScopeLabel = "Point d'interêt privé";
        return (
            <form className="HotspotForm MediaHotspotForm" onSubmit={this.formSubmit}>
                {/*
                    <code style={{ width: '300px', overflowWrap: 'break-word' }}>
                        {JSON.stringify(this.state)}
                    </code>
                */}
                <header style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <ImageCDN
                        filename={this.state.previewIcon}
                        alt="Icone choisi"
                        style={{ width: '50px' }}
                    />
                    <Typography
                        style={{ textAlign: 'center', marginBottom: '15px', marginLeft: '20px' }}
                        tag="h2"
                        use="body2"
                        theme="text-on-primary-background">
                        {initialValues.address}
                    </Typography>
                </header>
                <fieldset>
                    <legend>
                        <Typography tag="span" use="body1" theme="text-on-primary-background">
                            {labelFieldSetCreation}
                        </Typography>
                    </legend>
                    <ImagesPicker
                        listIcons={listIcons}
                        onIconSelected={this.fieldConnector('avatarIconUrl', validateAvatarIconUrl)}
                        onIconUploaded={this.fieldConnector(
                            'avatarIconUrl',
                            validateAvatarIconUrl,
                            { uploader: true },
                        )}
                    />
                    <TextField
                        className="cyz-text-field"
                        theme="text-on-primary-background"
                        label="Choisissez bien le titre"
                        outlined
                        value={this.state.formValues.title}
                        onChange={this.fieldConnector('title', validateTitle)}
                        onBlur={this.initValidationField('title', validateTitle)}
                        invalid={this.state.validate.title && !this.state.validate.title.isValid}
                    />
                    {this.state.validate.title && this.state.validate.title.isValid === false ? (
                        <TextFieldValidationMessages
                            messages={this.state.validate.title.messages}
                        />
                    ) : null}
                    <Switch
                        checked={this.state.formValues.scope}
                        onChange={this.fieldConnector('scope', validateScope, { switch: true })}>
                        <Typography
                            style={{ marginLeft: '5px' }}
                            tag="span"
                            use="body1"
                            theme="text-on-primary-background">
                            {privateScopeLabel}
                        </Typography>
                    </Switch>
                </fieldset>
                <fieldset>
                    <legend>
                        <Typography tag="span" use="body1" theme="text-on-primary-background">
                            Ecrivez votre premier message
                        </Typography>
                    </legend>
                    <TextField
                        className="cyz-text-field"
                        theme="text-on-primary-background"
                        label="Le titre"
                        outlined
                        value={this.state.formValues.messageTitle}
                        onChange={this.fieldConnector('messageTitle', validateMessageTitle)}
                        onBlur={this.initValidationField('messageTitle', validateMessageTitle)}
                        invalid={
                            this.state.validate.messageTitle &&
                            !this.state.validate.messageTitle.isValid
                        }
                    />
                    {this.state.validate.messageTitle &&
                    this.state.validate.messageTitle.isValid === false ? (
                        <TextFieldValidationMessages
                            messages={this.state.validate.messageTitle.messages}
                        />
                    ) : null}
                    <RenderWysiwygComponent
                        value={this.state.formValues.messageBody}
                        onChange={this.fieldConnector('messageBody', validateMessageBody)}
                        placeholder="Exprimez vous..."
                    />
                </fieldset>
                <div className="submitArea">
                    <Button type="submit" raised theme="secondary-bg text-primary-on-secondary">
                        {"C'est bon !"}
                    </Button>
                    <Button
                        type="button"
                        onClick={this.onCancel}
                        raised
                        theme="secondary-bg text-primary-on-secondary">
                        {'Annuler'}
                    </Button>
                </div>
            </form>
        );
    }
}

MediaHotspotForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    dismissModal: PropTypes.func.isRequired,
    removeImage: PropTypes.func.isRequired,
    initialValues: PropTypes.shape({
        title: PropTypes.string,
    }).isRequired,
};

export default MediaHotspotForm;
