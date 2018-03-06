import React from 'react';
import PropTypes from 'prop-types';
import CustomScroll from 'react-custom-scroll';
import HotspotTitle from './HotspotTitle';
import HotspotMessagesWall from './HotspotMessagesWall';
import HotspotMessage from './HotspotMessage';
import {
    DEFAULT_HOTSPOT_MESSAGES_WORDING_BODY,
    DEFAULT_HOTSPOT_MESSAGES_WORDING_TITLE,
    CITYZEN_ADMIN_NAME,
} from './../../../../wording';

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

const isAuthor = (isAuthenticated, cityzenId, messageAuthorId) =>
    isAuthenticated && messageAuthorId === cityzenId;

const WallHotspot = ({ hotspot, isAuthenticated, cityzenId }) => (
    <section className="HotspotContent">
        <HotspotTitle title={hotspot.title} />
        <CustomScroll heightRelativeToParent="100%">
            <HotspotMessagesWall>
                {hotspot.messages.length === 0 ? (
                    <HotspotMessage message={EMPTY_MESSAGE_WORDING} key={EMPTY_MESSAGE_KEY} />
                ) : (
                    hotspot.messages.map(message => (
                        <HotspotMessage
                            cityzenIsAuthor={isAuthor(
                                isAuthenticated,
                                cityzenId,
                                message.author.id,
                            )}
                            message={message}
                            key={message.id}
                        />
                    ))
                )}
            </HotspotMessagesWall>
        </CustomScroll>
    </section>
);

WallHotspot.propTypes = {
    hotspot: PropTypes.shape({
        title: PropTypes.string.isRequired,
        messages: PropTypes.array.isRequired,
    }).isRequired,
};

export default WallHotspot;
