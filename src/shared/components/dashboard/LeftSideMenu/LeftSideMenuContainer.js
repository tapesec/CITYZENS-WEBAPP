import React from 'react';
import PropTypes from 'prop-types';

const transitionStyles = {
    entered: { left: 0 },
    entering: { left: '-500px' },
    exited: { left: '-500px' },
    exiting: { left: 0 },
};

const LeftSideMenuContainer = ({ state, children }) => (
    <div style={{ ...transitionStyles[state] }} className="LeftSideMenu">
        {children}
    </div>
);

LeftSideMenuContainer.propTypes = {
    children: PropTypes.node.isRequired,
    state: PropTypes.string.isRequired,
};

export default LeftSideMenuContainer;
