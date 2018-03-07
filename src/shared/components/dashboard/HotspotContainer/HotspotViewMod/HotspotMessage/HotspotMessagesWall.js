import React from 'react';
import PropTypes from 'prop-types';
import './HotspotMessagesWall.scss';

const HotspotMessagesWall = ({ children }) => <div className="HotspotMessagesWall">{children}</div>;

HotspotMessagesWall.propTypes = {
    children: PropTypes.node.isRequired,
};

export default HotspotMessagesWall;
