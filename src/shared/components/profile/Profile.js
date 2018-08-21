import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Typography } from 'rmwc/Typography';
import { Icon } from 'rmwc/Icon';
import { Button } from 'rmwc/Button';
import { visitorComeFromMobile } from '../../reducers/visitor';
import { getCityzenProfileFromApi, isAuthenticated } from '../../reducers/authenticatedCityzen';
import ImageCDN from './../lib/ImageCDN';
import ComboIcon from './../lib/comboIcon/ComboIcon';
import authConnector from './../hoc/authConnector';
import MainToolbar from './../toolbar/MainToolbar';
import DateFormater from './../lib/DateFormater';
import CustomTextArea from '../lib/form/CustomTextArea';
import VALIDATION from '../../constants/dataValidation';
import formHelpers from '../../helpers/form';
import TextFieldValidationMessages from '../lib/form/ValidationMessage';
import actions from '../../../client/actions';
import AvatarUploader from './AvatarUploader';
import { SNACKBAR } from './../../../client/wording';
import { NOTIFICATION_MESSAGE } from './../../../client/constants';
import './profile.scss';

const Nav = authConnector(MainToolbar);

const validateDescription = values => {
    const errors = {
        isValid: true,
        messages: [],
    };
    if (
        values.description &&
        values.description.length > VALIDATION.CITYZEN.DESCRIPTION.MAX_LENGTH
    ) {
        errors.isValid = false;
        errors.messages.push(VALIDATION.CITYZEN.DESCRIPTION.LABEL.ERROR);
    }
    return errors;
};

const listFieldsAndValidators = [
    {
        name: 'description',
        validator: validateDescription,
    },
];

class Profile extends React.Component {
    static displayDescription(pseudo, description) {
        if (!description) {
            return `${pseudo} n'a pas encore renseigné de description`;
        }
        return `"${description}"`;
    }
    constructor(props) {
        super(props);
        this.state = {
            isEditMode: false,
            formValues: {
                description: props.authenticatedCityzen.description,
            },
            validate: {},
        };
        this.displaySettingsAction = this.displaySettingsAction.bind(this);
        this.turnOnEditMode = this.turnOnEditMode.bind(this);
        this.turnOffEditMode = this.turnOffEditMode.bind(this);
        this.fieldConnector = this.fieldConnector.bind(this);
        this.initValidationField = this.initValidationField.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
        this.onAvatarUploaded = this.onAvatarUploaded.bind(this);
    }

    onAvatarUploaded(pictureHandle) {
        this.setState({
            formValues: { ...this.state.formValues, pictureCityzen: pictureHandle },
        });
    }

    turnOnEditMode() {
        this.setState({
            isEditMode: true,
        });
    }

    turnOffEditMode() {
        if (this.state.formValues.pictureCityzen) {
            this.props.removeUploadedAvatar(this.state.formValues.pictureCityzen);
        }
        this.setState({
            isEditMode: false,
        });
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
        evt.preventDefault();
        const formStatus = formHelpers.formStatusBeforeSubmit(this.state, listFieldsAndValidators);
        if (formStatus.isValid === false) {
            this.setState(formStatus.newStateToUpdate);
            return false;
        }
        this.props.submitDescription(this.props.authenticatedCityzen.id, this.state.formValues);
        return true;
    }

    displaySettingsAction() {
        const content = [{ label: 'Editer le profil', action: () => this.turnOnEditMode() }].map(
            item => (
                <Typography
                    tag="div"
                    use="body2"
                    className="combo-item"
                    style={{ width: '100px' }}
                    key={item.label}
                    role="button"
                    onClick={() => item.action(item)}>
                    {item.label}
                </Typography>
            ),
        );
        if (this.props.isAuthenticated && this.props.authenticatedCityzen) {
            return !this.state.isEditMode ? (
                <ComboIcon
                    actionComponent={() => (
                        <Icon strategy="ligature" style={{ color: 'darkcyan' }}>
                            settings
                        </Icon>
                    )}
                    className="contextual-action"
                    content={content}
                />
            ) : null;
        }
        return null;
    }

    render() {
        const { authenticatedCityzen, displayMessageToScreen } = this.props;
        return (
            <Fragment>
                <Nav {...this.props} />

                <section className="Profile">
                    <section className="top-section">
                        <div className="settings">{this.displaySettingsAction()}</div>
                        <Typography
                            className="cityzen-place"
                            tag="div"
                            use="body2"
                            theme="text-primary">
                            <div className="cityzen-place-title">
                                <Icon strategy="ligature">location_city</Icon> Résidence
                            </div>
                            <div className="city-line">
                                <ImageCDN
                                    process
                                    processParam="output=format:png/resize=w:100,fit:clip/compress"
                                    filename="V0dsh7ZRSr2IIdhICY1T"
                                    style={{ width: '20px' }}
                                    alt="blazon de Martignas-sur-Jalle"
                                />{' '}
                                Martignas-sur-Jalle
                            </div>
                        </Typography>
                        <div className="avatar-picture">
                            {!this.state.isEditMode ? (
                                <ImageCDN
                                    process
                                    processParam="output=format:png/resize=w:140,fit:clip/compress"
                                    style={{
                                        width: '120px',
                                        borderRadius: '60px',
                                        border: '2px solid white',
                                        boxSizing: 'border-box',
                                        boxShadow: '0px 0px 2px 0px grey',
                                    }}
                                    filename={authenticatedCityzen.pictureCityzen}
                                    alt={`avatar de ${authenticatedCityzen.pseudo}`}
                                />
                            ) : (
                                <AvatarUploader
                                    onAvatarUploaded={this.onAvatarUploaded}
                                    displayMessageToScreen={displayMessageToScreen}
                                />
                            )}
                        </div>
                    </section>

                    <section className="content-section">
                        <Typography
                            className="pseudo"
                            use="subtitle1"
                            tag="h1"
                            theme="text-primary">
                            <Icon theme="secondary" strategy="ligature">
                                bookmark
                            </Icon>{' '}
                            {authenticatedCityzen.pseudo}
                        </Typography>
                        <Typography className="signupDate" use="body2" tag="p" theme="text-primary">
                            <Icon strategy="event">event</Icon>
                            Inscrit depuis <DateFormater date={authenticatedCityzen.createdAt} />
                        </Typography>
                        {!this.state.isEditMode ? (
                            <Typography
                                className="description"
                                use="body2"
                                tag="h1"
                                theme="text-primary">
                                <Icon strategy="ligature">record_voice_over</Icon>{' '}
                                {Profile.displayDescription(
                                    authenticatedCityzen.pseudo,
                                    authenticatedCityzen.description,
                                )}
                            </Typography>
                        ) : (
                            <form className="ProfileForm">
                                <CustomTextArea
                                    minRows={5}
                                    value={this.state.formValues.description}
                                    onChange={this.fieldConnector(
                                        'description',
                                        validateDescription,
                                    )}
                                    onBlur={this.initValidationField(
                                        'description',
                                        validateDescription,
                                    )}
                                    invalid={
                                        this.state.validate.description &&
                                        !this.state.validate.description.isValid
                                    }
                                    placeholder="Parlez de vous"
                                />
                                {this.state.validate.description &&
                                this.state.validate.description.isValid === false ? (
                                    <TextFieldValidationMessages
                                        messages={this.state.validate.description.messages}
                                    />
                                ) : null}
                                <div className="submitArea">
                                    <Button
                                        type="submit"
                                        onClick={this.formSubmit}
                                        dense
                                        theme="secondary-bg on-secondary">
                                        {'Valider'}
                                    </Button>
                                    <Button
                                        type="button"
                                        onClick={this.turnOffEditMode}
                                        dense
                                        theme="secondary-bg on-secondary">
                                        {'Annuler'}
                                    </Button>
                                </div>
                            </form>
                        )}
                    </section>
                </section>
            </Fragment>
        );
    }
}

Profile.propTypes = {
    // isFromMobile: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    authenticatedCityzen: PropTypes.shape({
        id: PropTypes.string,
        description: PropTypes.string,
    }).isRequired,
    submitDescription: PropTypes.func.isRequired,
    removeUploadedAvatar: PropTypes.func.isRequired,
    displayMessageToScreen: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    isFromMobile: visitorComeFromMobile(state),
    authenticatedCityzen: getCityzenProfileFromApi(state),
    isAuthenticated: isAuthenticated(state),
});

const mapDispatchToProps = dispatch => ({
    submitDescription: (userId, formValues) => {
        dispatch(actions.submitProfile(userId, formValues));
    },
    removeUploadedAvatar: handle => {
        dispatch(actions.removeImageWithHandle(handle));
    },
    displayMessageToScreen: () => {
        dispatch(
            actions.displayMessageToScreen(
                SNACKBAR.ERROR.GENERIC_FAIL,
                NOTIFICATION_MESSAGE.LEVEL.ERROR,
            ),
        );
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Profile);
