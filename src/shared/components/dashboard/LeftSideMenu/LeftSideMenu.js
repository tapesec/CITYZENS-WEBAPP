import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Drawer from './../../lib/Drawer';
import LeftSideMenuContainer from './LeftSideMenuContainer';
import LeftSideMenuHeader from './header/LeftSideMenuHeader';
import './LeftSideMenu.scss';


const LeftSideMenu = props => (
    <Drawer in={props.open}>
        {(state) => (
            <LeftSideMenuContainer state={state}>
                <LeftSideMenuHeader/>
            </LeftSideMenuContainer>
        )}
    </Drawer>
);

LeftSideMenu.propTypes = {
    open: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({ open: state.componentsVisibility.leftSideMenu.open });

export default connect(mapStateToProps)(LeftSideMenu);
