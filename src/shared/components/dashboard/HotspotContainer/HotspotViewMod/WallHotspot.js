import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HotspotHeader from './common/hotspotHeader/HotspotHeader';
import ActionsToolbar from './../Toolbar/ActionsToolbar';
import HotspotMessagesWall from './HotspotMessage/HotspotMessagesWall';
import HotspotMessage from './HotspotMessage/HotspotMessage';
import NewHotspotMessageForm from './HotspotMessage/NewMessageFormContainer';
import EditHotspotMessageForm from './HotspotMessage/EditMessageFormContainer';
import Slideshow from '../Widgets/Slideshow/Slideshow';
import { getCityzenId, isAuthenticated } from './../../../../reducers/authenticatedCityzen';
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
                <NewHotspotMessageForm
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
                <section style={{ marginRight: '12px' }}>
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

                        {hotspot.messages.length === 0 ? (
                            <HotspotMessage
                                message={EMPTY_MESSAGE_WORDING}
                                key={EMPTY_MESSAGE_KEY}
                            />
                        ) : (
                            hotspot.messages.map(
                                message =>
                                    messageEditionData.id === message.id ? (
                                        <EditHotspotMessageForm
                                            initialValues={messageEditionData}
                                            key={hotspot.id}
                                            onSubmit={handleSubmit}
                                            editionMode={settingUpMode}
                                            clearHotspotMessageEdition={clearHotspotMessageEdition}
                                        />
                                    ) : (
                                        <HotspotMessage
                                            cityzenIsAuthor={isAuthorOfMessage(
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
