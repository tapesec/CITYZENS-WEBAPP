import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'rmwc/Icon';
import './HotspotTitle.scss';

const HotspotTitle = ({ title }) => (
    <header className="HotspotTitle" style={{ marginBottom: 30, display: 'flex', justifyContent: 'space-between' }}>
        <h1 style={{ lineHeight: 1.6, flex: '2 0 0' }}>{title}</h1>
        <Icon strategy="component" style={{ lineHeight: 2.3, flex: '0.2 0 0' }}>
            lock_open
        </Icon>
    </header>
);

HotspotTitle.propTypes = {
    title: PropTypes.string.isRequired,
}

export default HotspotTitle;
