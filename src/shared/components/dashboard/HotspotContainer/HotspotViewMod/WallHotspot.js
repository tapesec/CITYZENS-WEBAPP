import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CustomScroll from 'react-custom-scroll';
import actions from './../../../../../client/actions';
import { getCityzenId, isAuthenticated } from './../../../../reducers/authenticatedCityzen';
import HotspotTitle from './HotspotTitle';
import HotspotMessagesWall from './HotspotMessage/HotspotMessagesWall';
import HotspotMessage from './HotspotMessage/HotspotMessage';
import HotspotMessageForm from './HotspotMessage/MessageForm';
import {
    DEFAULT_HOTSPOT_MESSAGES_WORDING_BODY,
    DEFAULT_HOTSPOT_MESSAGES_WORDING_TITLE,
    CITYZEN_ADMIN_NAME,
} from './../../../../wording';
import { messageEdition, getSettingUpMode } from './../../../../reducers/edition';

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
}) => {
    const handleSubmit = values => {
        submitForm(settingUpMode, values);
    };

    return (
        <section className="HotspotContent">
            <HotspotTitle title={hotspot.title} />
            <CustomScroll heightRelativeToParent="100%">
                <HotspotMessagesWall>
                    {hotspot.messages.length === 0 ? (
                        <HotspotMessage message={EMPTY_MESSAGE_WORDING} key={EMPTY_MESSAGE_KEY} />
                    ) : (
                        hotspot.messages.map(
                            message =>
                                messageEditionData.id === message.id ? (
                                    <HotspotMessageForm
                                        initialValues={messageEditionData}
                                        key={messageEdition.id}
                                        onSubmit={handleSubmit}
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
    );
};

WallHotspot.propTypes = {
    hotspot: PropTypes.shape({
        title: PropTypes.string.isRequired,
        messages: PropTypes.array.isRequired,
    }).isRequired,
    cityzenIsAuthenticated: PropTypes.bool.isRequired,
    cityzenId: PropTypes.string.isRequired,
    edit: PropTypes.func.isRequired,
    messageEditionData: PropTypes.shape({}).isRequired,
    settingUpMode: PropTypes.string.isRequired,
    clearHotspotMessageEdition: PropTypes.func.isRequired,
    submitForm: PropTypes.func.isRequired,
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
        dispatch(actions.postEditionMessageFormData(settingUpMode));
        dispatch(actions.saveInStateEditionMessageFormData(formData));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(WallHotspot);
