import React from 'react';
import { PersistentDrawer, PersistentDrawerHeader, PersistentDrawerContent } from 'rmwc/Drawer';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './LeftSideMenu.scss';

const LeftSideMenu = props => (
    <PersistentDrawer style={{ width: '400px' }} className="LeftSideMenu" open={props.open}>
        <PersistentDrawerHeader>Cityzens</PersistentDrawerHeader>
        <PersistentDrawerContent>{props.children}</PersistentDrawerContent>
    </PersistentDrawer>
);

LeftSideMenu.propTypes = {
    open: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({ open: state.componentsVisibility.leftSideMenu.open });

export default connect(mapStateToProps)(LeftSideMenu);
