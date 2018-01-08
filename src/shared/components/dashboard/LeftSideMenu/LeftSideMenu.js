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
    ListDivider,
} from 'rmwc/List';
import CustomScroll from 'react-custom-scroll';
import './../../../../../node_modules/react-custom-scroll/dist/customScroll.css';
import Drawer from './../../lib/Drawer';
import LeftSideMenuContainer from './LeftSideMenuContainer';
import LeftSideMenuHeader from './header/LeftSideMenuHeader';
import LeftSideMenuContent from './content/LeftSideMenuContent';
import './LeftSideMenu.scss';

const LeftSideMenu = props => (
    <Drawer in={props.open}>
        {state => (
            <LeftSideMenuContainer state={state}>
                <LeftSideMenuHeader />
                <LeftSideMenuContent>
                    <TextField
                        persistent="true"
                        fullwidth
                        withLeadingIcon={<TextFieldIcon use="search" />}
                        label="Que cherchez vous ?"
                    />
                    <div>
                        {/* search result list */}
                        <CustomScroll>
                            <List twoLine avatarList style={{ maxHeight: '200px' }}>
                                <ListItem>
                                    <ListItemStartDetail>
                                        <img
                                            style={{
                                                display: 'block',
                                                height: '100%',
                                                width: '100%',
                                                borderRadius: '50%',
                                            }}
                                            alt="avatar"
                                            src="https://dummyimage.com/300.png"
                                        />
                                    </ListItemStartDetail>
                                    <ListItemText>
                                        <h3 className="mdc-typography--subheading2 mdc-theme--secondary">
                                            Ecole Flora Tristan
                                        </h3>
                                        <ListItemSecondaryText>
                                            12 rue des écoles de Charlemagne
                                        </ListItemSecondaryText>
                                    </ListItemText>
                                </ListItem>
                                <ListDivider />
                                <ListItem>
                                    <ListItemStartDetail>
                                        <img
                                            style={{
                                                display: 'block',
                                                height: '100%',
                                                width: '100%',
                                                borderRadius: '50%',
                                            }}
                                            alt="avatar"
                                            src="https://randomuser.me/api/portraits/men/7.jpg"
                                        />
                                    </ListItemStartDetail>
                                    <ListItemText>
                                        <h3 className="mdc-typography--subheading2 mdc-theme--secondary">
                                            Eglise episcopal de Martignas
                                        </h3>
                                        <ListItemSecondaryText>
                                            1 place de Clovis 1er
                                        </ListItemSecondaryText>
                                    </ListItemText>
                                </ListItem>
                                <ListDivider />
                                <ListItem>
                                    <ListItemStartDetail>
                                        <img
                                            style={{
                                                display: 'block',
                                                height: '100%',
                                                width: '100%',
                                                borderRadius: '50%',
                                            }}
                                            alt="avatar"
                                            src="https://randomuser.me/api/portraits/women/7.jpg"
                                        />
                                    </ListItemStartDetail>
                                    <ListItemText>
                                        <h3 className="mdc-typography--subheading2 mdc-theme--secondary">
                                            Salle Gérard Philippe
                                        </h3>
                                        <ListItemSecondaryText>
                                            4 rue des Martyrs de la Résistance
                                        </ListItemSecondaryText>
                                    </ListItemText>
                                </ListItem>
                                <ListDivider />
                            </List>
                        </CustomScroll>
                    </div>
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
