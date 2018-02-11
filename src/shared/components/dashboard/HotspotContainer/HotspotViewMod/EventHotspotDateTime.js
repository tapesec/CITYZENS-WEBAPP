import React from 'react';
import Typography from 'rmwc/Typography';
import PropTypes from 'prop-types';
import { Icon } from 'rmwc/Icon';
import DateFormater from './../../../lib/DateFormater';
import './EventHotspotDateTime.scss';

const EventHotspotDateTime = ({ date }) => (
    <header className="EventHotspotTimeArea">
        <Typography tag="div" theme="text-icon-on-primary" className="iconContainer">
            <Icon strategy="component">
                today
            </Icon>
        </Typography>
        <Typography use="headline" tag="div" theme="secondary">
            <DateFormater date={date} />
        </Typography>
    </header>
);

EventHotspotDateTime.propTypes = {
    date: PropTypes.string.isRequired,
};

export default EventHotspotDateTime;
