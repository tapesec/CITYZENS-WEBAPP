import React from 'react';
import PropTypes from 'prop-types';
import { DrawerContent } from 'rmwc/Drawer';

const LeftSideMenuContent = ({ children }) => <DrawerContent>{children}</DrawerContent>;

LeftSideMenuContent.propTypes = {
    children: PropTypes.node.isRequired,
};

export default LeftSideMenuContent;
