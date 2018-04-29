import React from 'react';
import PropTypes from 'prop-types';
import ImageCDN from '../../lib/ImageCDN';

import './MarkerToolbar.scss';

const transitionStyles = {
    entered: { left: '397px' },
    entering: { left: 0 },
    exited: { left: 0 },
    exiting: { left: '397px' },
};

const MarkerToolbar = ({ state }) => (
    <aside style={{ ...transitionStyles[state] }} className="MarkerToolbar">
        <div className="MarkerContent" />
    </aside>
);

MarkerToolbar.propTypes = {
    state: PropTypes.string.isRequired,
};

export default MarkerToolbar;
