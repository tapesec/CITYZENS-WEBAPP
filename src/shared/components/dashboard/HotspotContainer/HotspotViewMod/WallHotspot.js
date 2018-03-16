import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CustomScroll from 'react-custom-scroll';
import { Typography } from 'rmwc/Typography';
import { Icon } from 'rmwc/Icon';
import HotspotTitle from './HotspotTitle';
import ActionsToolbar from './../Toolbar/ActionsToolbar';
import HotspotMessagesWall from './HotspotMessage/HotspotMessagesWall';
import HotspotMessage from './HotspotMessage/HotspotMessage';
import HotspotMessageForm from './HotspotMessage/MessageForm';
import Footer from './../Footer/Footer';
import { getCityzenId, isAuthenticated } from './../../../../reducers/authenticatedCityzen';
import actions from './../../../../../client/actions';
import constants from './../../../../constants';
import {
    DEFAULT_HOTSPOT_MESSAGES_WORDING_BODY,
    DEFAULT_HOTSPOT_MESSAGES_WORDING_TITLE,
    CITYZEN_ADMIN_NAME,
    WALLHOTSPOT,
} from './../../../../wording';
import { messageEdition, getSettingUpMode } from './../../../../reducers/edition';
import withViewCounter from './../../../hoc/hotspots/withViewCounter';

import './HotspotContent.scss';

const EMPTY_MESSAGE_KEY = 'first-key';
const EMPTY_MESSAGE_WORDING = {
    id: EMPTY_MESSAGE_KEY,
    title: DEFAULT_HOTSPOT_MESSAGES_WORDING_TITLE,
    author: {
        pseudo: CITYZEN_ADMIN_NAME,
    },
    createdAt: new Date().toISOString(),
    updatedAt: undefined,
    body: DEFAULT_HOTSPOT_MESSAGES_WORDING_BODY,
};

const isAuthor = (cityzenIsAuthenticated, cityzenId, messageAuthorId) =>
    cityzenIsAuthenticated && messageAuthorId === cityzenId;

const WallHotspot = ({
    hotspot,
    cityzenIsAuthenticated,
    cityzenId,
    edit,
    messageEditionData,
    settingUpMode,
    clearHotspotMessageEdition,
    submitForm,
    displayHotspotMessageForm,
}) => {
    const handleSubmit = values => {
        const payload = {
            ...values,
            hotspotId: hotspot.id,
        };
        submitForm(settingUpMode, payload);
    };

    const handleNewMessageButton = () => {
        displayHotspotMessageForm();
    };

    const displayNewMessageControl = () => {
        if (cityzenIsAuthenticated && hotspot.author.id === cityzenId) {
            return settingUpMode !== constants.EDITION_MODE.SETTING_UP ? (
                <Typography
                    onClick={handleNewMessageButton}
                    tag="div"
                    use="subheading2"
                    className="add-message-button"
                    theme="text-primary-on-background">
                    <Icon strategy="ligature">add_circle_outline</Icon>
                    <span>{WALLHOTSPOT.BUTTON_ADD_MESSAGE}</span>
                </Typography>
            ) : (
                <HotspotMessageForm
                    initialValues={messageEditionData}
                    key={hotspot.id}
                    onSubmit={handleSubmit}
                    editionMode={settingUpMode}
                    clearHotspotMessageEdition={clearHotspotMessageEdition}
                />
            );
        }
        return null;
    };

    return (
        <Fragment>
            <ActionsToolbar />
            <section className="HotspotContent">
                <HotspotTitle title={hotspot.title} />
                <CustomScroll heightRelativeToParent="100%">
                    <HotspotMessagesWall>
                        {displayNewMessageControl()}

                        {hotspot.messages.length === 0 ? (
                            <HotspotMessage
                                message={EMPTY_MESSAGE_WORDING}
                                key={EMPTY_MESSAGE_KEY}
                            />
                        ) : (
                            hotspot.messages.map(
                                message =>
                                    messageEditionData.id === message.id ? (
                                        <HotspotMessageForm
                                            initialValues={messageEditionData}
                                            key={hotspot.id}
                                            onSubmit={handleSubmit}
                                            editionMode={settingUpMode}
                                            clearHotspotMessageEdition={clearHotspotMessageEdition}
                                        />
                                    ) : (
                                        <HotspotMessage
                                            cityzenIsAuthor={isAuthor(
                                                cityzenIsAuthenticated,
                                                cityzenId,
                                                message.author.id,
                                            )}
                                            message={message}
                                            key={message.id}
                                            edit={edit}
                                        />
                                    ),
                            )
                        )}
                    </HotspotMessagesWall>
                </CustomScroll>
            </section>
            <Footer views={hotspot.views} />
        </Fragment>
    );
};

WallHotspot.propTypes = {
    hotspot: PropTypes.shape({
        title: PropTypes.string.isRequired,
        messages: PropTypes.array.isRequired,
        views: PropTypes.number.isRequired,
    }).isRequired,
    cityzenIsAuthenticated: PropTypes.bool.isRequired,
    cityzenId: PropTypes.string,
    edit: PropTypes.func.isRequired,
    messageEditionData: PropTypes.shape({}).isRequired,
    settingUpMode: PropTypes.string.isRequired,
    clearHotspotMessageEdition: PropTypes.func.isRequired,
    submitForm: PropTypes.func.isRequired,
    displayHotspotMessageForm: PropTypes.func.isRequired,
};

WallHotspot.defaultProps = {
    cityzenId: undefined,
};

const mapStateToProps = state => ({
    cityzenId: getCityzenId(state),
    cityzenIsAuthenticated: isAuthenticated(state),
    messageEditionData: messageEdition.getCurrentMessageEdition(state),
    settingUpMode: getSettingUpMode(state),
});

const mapDispatchToProps = dispatch => ({
    edit: (id, title, body, pinned) => {
        dispatch(actions.editMessageHotspot(id, title, body, pinned));
    },
    submitForm: (settingUpMode, formData) => {
        dispatch(actions.postEditionMessageFormData(settingUpMode, formData));
    },
    displayHotspotMessageForm: () => {
        dispatch(actions.displaySettingUpHotspotMessageForm());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(withViewCounter(WallHotspot));
