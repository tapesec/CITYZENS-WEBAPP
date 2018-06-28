import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'rmwc/Button';
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
        if (formStatus.isValid === false) {
            evt.preventDefault();
            this.setState(formStatus.newStateToUpdate);
            return false;
        }
        evt.preventDefault();
        this.props.persistMessageComment(
            constants.EDITION_MODE.SETTING_UP,
            { body: this.state.formValues.body },
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
                        onChange={this.fieldConnector('body', validateBody)}
                        placeholder="Laissez un commentaire …"
                        editorContentStyle={{ minHeight: '35px' }}
                    />
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
