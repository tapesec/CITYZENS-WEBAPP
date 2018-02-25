import React, { Fragment } from 'react';
import { GatewayDest, GatewayProvider } from 'react-gateway';
import { Route, Switch } from 'react-router-dom';
import authConnector from './hoc/authConnector';
import MainContainer from './MainContainer';
import Dashboard from './dashboard/Dashboard';
import MainToolbar from './toolbar/MainToolbar';

import './../../client/main.scss';
// import './../../../node_modules/material-components-web/dist/material-components-web.min.css';
/* eslint-disable */

class App extends React.Component {
    render() {
        const Nav = authConnector(MainToolbar);
        return (
            <GatewayProvider>
                <Fragment>
                    <MainContainer>
                        <Nav />
                        <Switch>
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
