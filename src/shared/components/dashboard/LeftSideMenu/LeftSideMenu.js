import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Drawer from './../../lib/Drawer';
import './LeftSideMenu.scss';

const LeftSideMenu = props => (
    <Drawer in={props.open}>
        <div className="LeftSideMenu">
            <h1>Test</h1>
        </div>
    </Drawer>
);

LeftSideMenu.propTypes = {
    open: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({ open: state.componentsVisibility.leftSideMenu.open });

export default connect(mapStateToProps)(LeftSideMenu);
