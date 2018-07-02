import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HotspotHeader from './common/hotspotHeader/HotspotHeader';
import ActionsToolbar from './../Toolbar/ActionsToolbar';
import HotspotMessagesWall from './HotspotMessage/HotspotMessagesWall';
import HotspotMessage from './HotspotMessage/HotspotMessage';
import MessageForm from './HotspotMessage/MessageForm';
import Slideshow from '../Widgets/Slideshow/Slideshow';
import {
    getCityzenId,
    isAuthenticated,
    getCityzenProfile,
} from './../../../../reducers/authenticatedCityzen';
import actions from './../../../../../client/actions';
import constants from './../../../../constants';
import {
    DEFAULT_HOTSPOT_MESSAGES_WORDING_BODY,
    DEFAULT_HOTSPOT_MESSAGES_WORDING_TITLE,
    CITYZEN_ADMIN_NAME,
} from './../../../../wording';
import { messageEdition, getSettingUpMode } from './../../../../reducers/edition';
import withViewCounter from './../../../hoc/hotspots/withViewCounter';

import './WallHotspot.scss';

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

const isAuthorOfMessage = (cityzenIsAuthenticated, cityzenId, messageAuthorId) =>
    cityzenIsAuthenticated && messageAuthorId === cityzenId;

const WallHotspot = ({
    hotspot,
    cityzenIsAuthenticated,
    cityzenId,
    cityzenProfile,
    edit,
    messageEditionData,
    settingUpMode,
    clearHotspotMessageEdition,
    submitForm,
    displayHotspotMessageForm,
    selectWidgetToConfigure,
    closeAction,
}) => {
    const handleSubmit = values => {
        const payload = {
            ...values,
            hotspotId: hotspot.id,
        };
        submitForm(settingUpMode, payload);
    };

    const displaySlideshowWidget = () => {
        if (hotspot.slideShow.length > 0) {
            return <Slideshow imageIds={hotspot.slideShow} />;
        }
        return null;
    };

    const displayNewMessageControl = () => {
        if (cityzenIsAuthenticated && hotspot.author.id === cityzenId) {
            return settingUpMode === constants.EDITION_MODE.SETTING_UP ? (
                <MessageForm
                    initialValues={messageEditionData}
                    key={hotspot.id}
                    onSubmit={handleSubmit}
                    editionMode={settingUpMode}
                    clearHotspotMessageEdition={clearHotspotMessageEdition}
                />
            ) : null;
        }
        return null;
    };

    const displayContent = () => {
        if (hotspot.messages.length === 0) {
            return <HotspotMessage message={EMPTY_MESSAGE_WORDING} key={EMPTY_MESSAGE_KEY} />;
        }
        return hotspot.messages.map(message => {
            if (messageEditionData.id === message.id)
                return (
                    <MessageForm
                        initialValues={messageEditionData}
                        key={hotspot.id}
                        onSubmit={handleSubmit}
                        editionMode={settingUpMode}
                        clearHotspotMessageEdition={clearHotspotMessageEdition}
                    />
                );
            return (
                <HotspotMessage
                    cityzenIsAuthor={isAuthorOfMessage(
                        cityzenIsAuthenticated,
                        cityzenId,
                        message.author.id,
                    )}
                    message={message}
                    key={message.id}
                    hotspotId={hotspot.id}
                    edit={edit}
                    cityzenIsAuthenticated={cityzenIsAuthenticated}
                    cityzen={cityzenProfile}
                />
            );
        });
    };

    return (
        <Fragment>
            {cityzenIsAuthenticated && hotspot.author.id === cityzenId ? (
                <ActionsToolbar
                    slideShowAction={() => {
                        selectWidgetToConfigure(hotspot.id, constants.WIDGET.NAME.MEDIA_SLIDE_SHOW);
                    }}
                    newMessageAction={displayHotspotMessageForm}
                    closeAction={closeAction}
                />
            ) : (
                <ActionsToolbar closeAction={closeAction} />
            )}

            <section className="HotspotContent">
                <section>
                    <HotspotHeader
                        title={hotspot.title}
                        hotspotType={hotspot.type}
                        address={hotspot.address.name}
                        views={hotspot.views}
                        hotspotIcon={hotspot.avatarIconUrl}
                    />
                    {displaySlideshowWidget()}
                    <HotspotMessagesWall>
                        {displayNewMessageControl()}
                        {displayContent()}
                    </HotspotMessagesWall>
                </section>
            </section>
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
    cityzenProfile: PropTypes.shape({}),
    edit: PropTypes.func.isRequired,
    messageEditionData: PropTypes.shape({}).isRequired,
    settingUpMode: PropTypes.string.isRequired,
    clearHotspotMessageEdition: PropTypes.func.isRequired,
    submitForm: PropTypes.func.isRequired,
    displayHotspotMessageForm: PropTypes.func.isRequired,
    selectWidgetToConfigure: PropTypes.func.isRequired,
    closeAction: PropTypes.func.isRequired,
};

WallHotspot.defaultProps = {
    cityzenId: undefined,
    cityzenProfile: undefined,
};

const mapStateToProps = state => ({
    cityzenId: getCityzenId(state),
    cityzenIsAuthenticated: isAuthenticated(state),
    cityzenProfile: getCityzenProfile(state),
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
        dispatch(actions.clearHotspotMessageEdition());
        dispatch(actions.displaySettingUpHotspotMessageForm());
    },
    selectWidgetToConfigure: (hotspotId, widgetName) => {
        dispatch(actions.selectWidgetToConfigure(hotspotId, widgetName));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withViewCounter(WallHotspot));
