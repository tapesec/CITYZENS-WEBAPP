import React from 'react';
import PropTypes from 'prop-types';
import CustomScroll from 'react-custom-scroll';
import HotspotTitle from './HotspotTitle';
import EventHotspotDescription from './EventHotspotDescription';
import EventHotspotDateTime from './EventHotspotDateTime';
import EventHotspotCountDown from './EventHotspotCountDown';
import './HotspotContent.scss';

const EventHotspot = ({ hotspot }) => (
    <section className="HotspotContent">
        <HotspotTitle title={hotspot.title} />
        <EventHotspotDateTime date={hotspot.dateEnd} />
        <EventHotspotCountDown dateEnd={hotspot.dateEnd} />
        <CustomScroll heightRelativeToParent="100%">
            <EventHotspotDescription
                description={hotspot.description}
                author={hotspot.author}
                dateEnd={hotspot.dateEnd}
            />
        </CustomScroll>
    </section>
);

EventHotspot.propTypes = {
    hotspot: PropTypes.shape({
        title: PropTypes.string.isRequired,
        dateEnd: PropTypes.string.isRequired,
        description: PropTypes.object.isRequired,
        author: PropTypes.object.isRequired,
    }).isRequired,
};

export default EventHotspot;
