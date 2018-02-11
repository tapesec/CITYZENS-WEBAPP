import React from 'react';
import PropTypes from 'prop-types';
import CustomScroll from 'react-custom-scroll';
import HotspotTitle from './HotspotTitle';
import HotspotMessagesWall from './HotspotMessagesWall';
import HotspotMessage from './HotspotMessage';

import './HotspotContent.scss';

const WallHotspot = ({ hotspot }) => (
    <section className="HotspotContent">
        <HotspotTitle title={hotspot.title} />
        <CustomScroll heightRelativeToParent="100%">
            <HotspotMessagesWall>
                {hotspot.messages.map(message => (
                    <HotspotMessage message={message} key={message.id}/>
                ))}
            </HotspotMessagesWall>
        </CustomScroll>
    </section>
);

WallHotspot.propTypes = {
    hotspot: PropTypes.object.isRequired,
};

export default WallHotspot;
