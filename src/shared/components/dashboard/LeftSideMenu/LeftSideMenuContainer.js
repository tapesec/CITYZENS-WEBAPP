import React from 'react';

const transitionStyles = {
    entered: { left: 0 },
    entering:  { left: '-396px' },
    exited: { left: '-396px' },
    exiting: { left: 0}
};

const LeftSideMenuContainer = ({state, children}) => (
    <div
    style={{ ...transitionStyles[state] }}
    className="LeftSideMenu">
        {children}
    </div>
);

export default LeftSideMenuContainer;
