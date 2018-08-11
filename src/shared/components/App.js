import React, { Fragment } from 'react';
import { GatewayDest, GatewayProvider } from 'react-gateway';
import { Route, Switch } from 'react-router-dom';
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

import authConnector from './hoc/authConnector';
import MainContainer from './MainContainer';
import Home from './home/Home';
import Profile from './profile/Profile';
import Dashboard from './dashboard/Dashboard';
import MainToolbar from './toolbar/MainToolbar';

// import './../../../node_modules/material-components-web/dist/material-components-web.min.css';
/* eslint-disable */

class App extends React.Component {
    render() {
        const Nav = authConnector(MainToolbar);
        return (
            <GatewayProvider>
                <Fragment>
                    <MainContainer>
                        <Nav {...this.props} />
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/profile/:userId" component={Profile} />
                            <Route path="/:citySlug" component={Dashboard} />
                        </Switch>
                    </MainContainer>
                    <GatewayDest name="HotspotModal" className="modal-container" />
                </Fragment>
            </GatewayProvider>
        );
    }
}
/* eslint-enable */
export default App;
