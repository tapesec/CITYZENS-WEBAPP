import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { TextField, TextFieldIcon } from 'rmwc/TextField';
import {
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryText,
    ListItemStartDetail,
    ListItemEndDetail,
    ListDivider,
    ListGroup,
    ListGroupSubheader
  } from 'rmwc/List';
import Drawer from './../../lib/Drawer';
import LeftSideMenuContainer from './LeftSideMenuContainer';
import LeftSideMenuHeader from './header/LeftSideMenuHeader';
import LeftSideMenuContent from './content/LeftSideMenuContent';
import './LeftSideMenu.scss';


const LeftSideMenu = props => (
    <Drawer in={props.open}>
        {(state) => (
            <LeftSideMenuContainer state={state}>
                <LeftSideMenuHeader/>
                <LeftSideMenuContent>
                    <TextField
                    persistent
                    fullwidth
                    withLeadingIcon={
                    <TextFieldIcon use="search"/>
                    }
                    label="Que cherchez vous ?" />
                    <List twoLine avatarList>
  <ListItem>
    <ListItemStartDetail>star_border</ListItemStartDetail>
    <ListItemText>Cookies</ListItemText>
    <ListItemSecondaryText>Deuxieme ligne</ListItemSecondaryText>
    <ListItemEndDetail>info</ListItemEndDetail>
  </ListItem>

  <ListItem>
    <ListItemStartDetail>favorite_border</ListItemStartDetail>
    <ListItemText>Pizza</ListItemText>
    <ListItemEndDetail>info</ListItemEndDetail>
  </ListItem>

  <ListItem>
    <ListItemStartDetail>mood</ListItemStartDetail>
    <ListItemText>Icecream</ListItemText>
    <ListItemEndDetail>info</ListItemEndDetail>
  </ListItem>
</List>
                </LeftSideMenuContent>
            </LeftSideMenuContainer>
        )}
    </Drawer>
);

LeftSideMenu.propTypes = {
    open: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({ open: state.componentsVisibility.leftSideMenu.open });

export default connect(mapStateToProps)(LeftSideMenu);
