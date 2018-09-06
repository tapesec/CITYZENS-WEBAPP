import React, { Fragment } from 'react';
import { GatewayDest, GatewayProvider } from 'react-gateway';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { isAuthenticated } from '../reducers/authenticatedCityzen';
import '../../../node_modules/@material/theme/dist/mdc.theme.min.css';
import '../../../node_modules/@material/top-app-bar/dist/mdc.top-app-bar.min.css';
import '../../../node_modules/@material/typography/dist/mdc.typography.min.css';
import '../../../node_modules/@material/toolbar/dist/mdc.toolbar.min.css';
import '../../../node_modules/@material/menu/dist/mdc.menu.min.css';
import '../../../node_modules/@material/button/dist/mdc.button.min.css';
import '../../../node_modules/@material/fab/dist/mdc.fab.min.css';
import '../../../node_modules/@material/drawer/dist/mdc.drawer.min.css';
import '../../../node_modules/@material/textfield/dist/mdc.textfield.min.css';
import '../../../node_modules/@material/switch/dist/mdc.switch.min.css';
import '../../../node_modules/@material/list/dist/mdc.list.min.css';
import '../../../node_modules/@material/snackbar/dist/mdc.snackbar.min.css';
import '../../../node_modules/@material/elevation/dist/mdc.elevation.min.css';
import '../../../node_modules/@material/layout-grid/dist/mdc.layout-grid.min.css';
import '../../../node_modules/@material/ripple/dist/mdc.ripple.min.css';
import './../../client/main.scss';

import MainContainer from './MainContainer';
import Home from './home/Home';
import Profile from './profile/Profile';
import Dashboard from './dashboard/Dashboard';

// import './../../../node_modules/material-components-web/dist/material-components-web.min.css';
/* eslint-disable */

class App extends React.Component {
    render() {
        return (
            <GatewayProvider>
                <Fragment>
                    <MainContainer>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route
                                exact
                                path="/profile/:userId"
                                render={props =>
                                    !props.isAuthenticated ? (
                                        <Redirect push to="/login" />
                                    ) : (
                                        <Profile {...props} />
                                    )
                                }
                            />
                            <Route path="/:citySlug" component={Dashboard} />
                        </Switch>
                    </MainContainer>
                    <GatewayDest name="HotspotModal" className="modal-container" />
                </Fragment>
            </GatewayProvider>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: isAuthenticated(state),
});
/* eslint-enable */
export default connect(mapStateToProps)(App);
