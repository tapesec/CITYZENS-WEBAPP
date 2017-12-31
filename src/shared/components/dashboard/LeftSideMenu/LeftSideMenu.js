import React from 'react';
import { PersistentDrawer, PersistentDrawerContent } from 'rmwc/Drawer';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LeftSideMenuHeader from './header/LeftSideMenuHeader';
import './LeftSideMenu.scss';

const LeftSideMenu = props => (
    <PersistentDrawer theme={['primary-dark-bg']} className="LeftSideMenu" open={props.open}>
        <LeftSideMenuHeader />
        <PersistentDrawerContent>{props.children}</PersistentDrawerContent>
    </PersistentDrawer>
);

LeftSideMenu.propTypes = {
    open: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({ open: state.componentsVisibility.leftSideMenu.open });

export default connect(mapStateToProps)(LeftSideMenu);
