import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import actions from '../../../../../../client/actions';
import constants from '../../../../../constants';
import RenderWysiwygComponent from './../../../../lib/form/WysiwygTextArea';
import formHelpers from '../../../../../helpers/form';
import ImageCDN from '../../../../lib/ImageCDN';
import VALIDATION from './../../../../../constants/dataValidation';

import './HotspotCommentForm.scss';

const validateBody = values => {
    const errors = {
        isValid: true,
        messages: [],
    };
    if (values.body && values.messageTitle.length > VALIDATION.MESSAGE.TITLE.MAX_LENGTH) {
        errors.isValid = false;
        errors.messages.push(VALIDATION.MESSAGE.TITLE.LABEL.ERROR);
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
        this.props.persistMessageComment(
            constants.EDITION_MODE.SETTING_UP,
            this.state.formValues,
            this.props.parentId,
        );
        return true;
    }

    render() {
        return (
            <section className="HotspotCommentForm">
                <aside className="cityzen-avatar-aside">
                    <ImageCDN
                        filename="KI9EVeOiS3KbqA5G7es1"
                        alt="votre avatar"
                        style={{ width: '40px', marginRight: '16px' }}
                    />
                </aside>
                <div className="form-content">
                    <RenderWysiwygComponent
                        value={this.state.formValues.body}
                        onChange={this.fieldConnector('messageBody', validateBody)}
                        placeholder="Laissez un commentaire …"
                        editorContentStyle={{ minHeight: '35px' }}
                    />
                </div>
            </section>
        );
    }
}

HotspotCommentForm.propTypes = {
    parentId: PropTypes.string.isRequired,
    persistMessageComment: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
    persistMessageComment: (settingUpMode, formData, parentId) => {
        dispatch(actions.persistMessageComment(settingUpMode, formData, parentId));
    },
});

export default connect(
    () => {},
    mapDispatchToProps,
)(HotspotCommentForm);
