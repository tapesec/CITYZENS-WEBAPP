import React from 'react';
import PropTypes from 'prop-types';

const transitionStyles = {
    entered: 'entered',
    entering: 'entering',
    exited: 'exited',
    exiting: 'exiting',
};

const LeftSideMenuContainer = ({ state, children }) => (
    <div className={`LeftSideMenu ${transitionStyles[state]}`}>{children}</div>
);

LeftSideMenuContainer.propTypes = {
    children: PropTypes.node.isRequired,
    state: PropTypes.string.isRequired,
};

export default LeftSideMenuContainer;
