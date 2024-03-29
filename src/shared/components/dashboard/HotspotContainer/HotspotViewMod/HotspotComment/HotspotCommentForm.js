import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'rmwc/Button';
import actions from '../../../../../../client/actions';
import constants from '../../../../../constants';
import CustomTextArea from '../../../../lib/form/CustomTextArea';
import TextFieldValidationMessages from '../../../../lib/form/ValidationMessage';
import formHelpers from '../../../../../helpers/form';
import ImageCDN from '../../../../lib/ImageCDN';
import VALIDATION from './../../../../../constants/dataValidation';

import './HotspotCommentForm.scss';

const validateBody = values => {
    const errors = {
        isValid: true,
        messages: [],
    };
    if (values.body && values.body.length > VALIDATION.COMMENT.MAX_LENGTH) {
        errors.isValid = false;
        errors.messages.push(VALIDATION.COMMENT.LABEL.ERROR);
    }
    return errors;
};

const listFieldsAndValidators = [
    {
        name: 'body',
        validator: validateBody,
    },
];

class HotspotCommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formValues: {
                body: '',
                parentId: this.props.parentId,
            },
            validate: {},
        };
        this.fieldConnector = this.fieldConnector.bind(this);
        this.initValidationField = this.initValidationField.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
    }

    fieldConnector(fieldName, fieldValidator) {
        const that = this;
        return evt => {
            const newState = formHelpers.validateAndUpdateFieldStateOnChange(
                that.state,
                fieldName,
                fieldValidator,
                evt.target.value,
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
        evt.preventDefault();
        if (formStatus.isValid === false) {
            this.setState(formStatus.newStateToUpdate);
            return false;
        }
        this.props.persistMessageComment(
            constants.EDITION_MODE.SETTING_UP,
            { body: this.state.formValues.body, parentId: this.state.formValues.parentId },
            this.props.hotspotId,
        );
        this.setState({
            ...this.state,
            formValues: {
                body: '',
                parentId: this.state.formValues.parentId,
            },
        });
        return true;
    }

    render() {
        return (
            <section className="HotspotCommentForm">
                <aside className="cityzen-avatar-aside">
                    <ImageCDN
                        filename={this.props.cityzen.pictureCityzen}
                        alt="votre avatar"
                        style={{ width: '40px', marginRight: '16px' }}
                        process
                        processParam="output=format:png/resize=w:80,fit:clip/compress/circle"
                    />
                </aside>
                <div className="form-content">
                    <CustomTextArea
                        value={this.state.formValues.body}
                        onChange={this.fieldConnector('body', validateBody)}
                        onBlur={this.initValidationField('body', validateBody)}
                        placeholder="Laissez un commentaire …"
                        minRows={3}
                        invalid={this.state.validate.body && !this.state.validate.body.isValid}
                    />
                    {this.state.validate.body && this.state.validate.body.isValid === false ? (
                        <TextFieldValidationMessages messages={this.state.validate.body.messages} />
                    ) : null}
                    <Button
                        style={{ marginTop: '5px' }}
                        type="submit"
                        onClick={this.formSubmit}
                        dense
                        theme="secondary-bg on-secondary">
                        Répondre
                    </Button>
                </div>
            </section>
        );
    }
}

HotspotCommentForm.propTypes = {
    parentId: PropTypes.string.isRequired,
    hotspotId: PropTypes.string.isRequired,
    persistMessageComment: PropTypes.func.isRequired,
    cityzen: PropTypes.shape({
        pictureCityzen: PropTypes.string,
        // pictureAuthor: PropTypes.string,
    }).isRequired,
};

const mapDispatchToProps = dispatch => ({
    persistMessageComment: (settingUpMode, formData, hotspotId) => {
        dispatch(actions.persistMessageComment(settingUpMode, formData, hotspotId));
    },
});

export default connect(
    () => ({}),
    mapDispatchToProps,
)(HotspotCommentForm);
