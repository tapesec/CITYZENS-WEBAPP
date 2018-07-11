import React from 'react';
import ReactFilestack from 'filestack-react';
import PropTypes from 'prop-types';
import { Button } from 'rmwc/Button';
import { TextField } from 'rmwc/TextField';
import { Typography } from 'rmwc/Typography';
import { Icon } from 'rmwc/Icon';
import ImageCDN from '../../lib/ImageCDN';
import config from '../../../config';
import formHelpers from '../../../helpers/form';
import TextFieldValidationMessages from '../../lib/form/ValidationMessage';
import VALIDATION from './../../../constants/dataValidation';

import './AlertHotspotForm.scss';

const { HOTSPOT } = VALIDATION;

const validateMessageBody = values => {
    const errors = {
        isValid: true,
        messages: [],
    };
    if (!values.messageBody) {
        errors.isValid = false;
        errors.messages.push(VALIDATION.ALL.LABEL.ERROR);
    }
    if (
        values.messageBody &&
        values.messageBody.length > HOTSPOT.ALERT_HOTSPOT.MESSAGE.MAX_LENGTH
    ) {
        errors.isValid = false;
        errors.messages.push(HOTSPOT.ALERT_HOTSPOT.MESSAGE.LABEL.ERROR);
    }
    return errors;
};

const listFieldsAndValidators = [
    {
        name: 'messageBody',
        validator: validateMessageBody,
    },
];

class AlertHotspotForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formValues: {
                messageBody: props.initialValues.messageBody || '',
            },
            validate: {},
            initialValues: props.initialValues,
            imagePickedValid: true,
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

    fieldConnector(fieldName, fieldValidator) {
        return evt => {
            const newState = formHelpers.validateAndUpdateFieldStateOnChange(
                this.state,
                fieldName,
                fieldValidator,
                evt.target.value,
            );
            this.setState(newState);
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
        if (!this.state.imagePickedHandle) {
            evt.preventDefault();
            this.setState({ imagePickedValid: false });
            return false;
        }
        const data = {
            ...this.state.formValues,
            alertHotspotImgLocation: this.state.imagePickedHandle,
        };
        this.props.onSubmit(data);
        return true;
    }

    render() {
        const { initialValues, fromMobile, displayMessageToScreen } = this.props;
        const fileStackOptions = {
            fromSources: ['local_file_system', 'url', 'webcam'],
            accept: ['image/*'],
            // maxSize: 3000000,
            maxFiles: 1,
            minFiles: 1,
            lang: 'fr',
            transformations: {
                rotate: true,
                crop: {
                    force: true,
                    aspectRatio: 2.39 / 1,
                },
            },
        };
        return (
            <form className="HotspotForm cityzen-form" onSubmit={this.formSubmit}>
                <Typography
                    style={{ textAlign: 'center' }}
                    tag="h2"
                    use="body1"
                    theme="text-on-primary-background">
                    <strong>Ajouter un signalement</strong>
                </Typography>
                <Typography
                    style={{ textAlign: 'center', marginBottom: '20px' }}
                    tag="h2"
                    use="body2"
                    theme="text-on-primary-background">
                    {initialValues.address}
                </Typography>
                {!this.state.imagePickedHandle ? (
                    <ReactFilestack
                        apikey={config.fileStack.apiKey}
                        security={config.fileStack.security}
                        options={fileStackOptions}
                        onSuccess={result => {
                            const image = result.filesUploaded[0];
                            const { handle } = image;
                            this.setState({ imagePickedHandle: handle, imagePickedValid: true });
                        }}
                        onError={() => {
                            displayMessageToScreen(); // eslint-disable-line no-console
                        }}
                        render={({ onPick }) => (
                            <div
                                style={!this.state.imagePickedValid ? { borderColor: 'red' } : {}}
                                onClick={onPick}
                                role="button"
                                tabIndex={-1}
                                onKeyUp={onPick}
                                className="alert-dropzone">
                                <Typography tag="span" use="subtitle1">
                                    {fromMobile ? (
                                        <span
                                            style={
                                                !this.state.imagePickedValid ? { color: 'red' } : {}
                                            }>
                                            <Icon
                                                style={
                                                    !this.state.imagePickedValid
                                                        ? { color: 'red', verticalAlign: 'middle' }
                                                        : { verticalAlign: 'middle' }
                                                }
                                                stategy="ligature">
                                                camera_alt
                                            </Icon>Touchez pour prendre une photo
                                        </span>
                                    ) : (
                                        <span
                                            style={
                                                !this.state.imagePickedValid ? { color: 'red' } : {}
                                            }>
                                            <Icon
                                                style={
                                                    !this.state.imagePickedValid
                                                        ? { color: 'red', verticalAlign: 'middle' }
                                                        : { verticalAlign: 'middle' }
                                                }
                                                stategy="ligature">
                                                find_in_page
                                            </Icon>
                                            Cliquez ici pour déposer vos images
                                        </span>
                                    )}
                                </Typography>
                            </div>
                        )}
                    />
                ) : (
                    <ImageCDN
                        process
                        processParam="output=format:jpg/resize=height:200,w:600,fit:crop,align:center/compress"
                        filename={this.state.imagePickedHandle}
                        style={{ width: '100%' }}
                    />
                )}
                <TextField
                    className="cyz-text-field"
                    label="Que constatez vous ?"
                    textarea
                    value={this.state.formValues.address}
                    onChange={this.fieldConnector('messageBody', validateMessageBody)}
                    onBlur={this.initValidationField('messageBody', validateMessageBody)}
                    invalid={
                        this.state.validate.messageBody && !this.state.validate.messageBody.isValid
                    }
                />
                {this.state.validate.messageBody &&
                this.state.validate.messageBody.isValid === false ? (
                    <TextFieldValidationMessages
                        messages={this.state.validate.messageBody.messages}
                    />
                ) : null}
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

AlertHotspotForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    dismissModal: PropTypes.func.isRequired,
    displayMessageToScreen: PropTypes.func.isRequired,
    removeImage: PropTypes.func.isRequired,
    initialValues: PropTypes.shape({
        messageBody: PropTypes.string,
    }).isRequired,
    fromMobile: PropTypes.bool.isRequired,
};

export default AlertHotspotForm;
