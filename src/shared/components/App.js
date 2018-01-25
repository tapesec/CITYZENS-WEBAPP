import React from 'react';
import { GatewayDest, GatewayProvider } from 'react-gateway';
import { Route, Switch } from 'react-router-dom';
import './../../../node_modules/material-components-web/dist/material-components-web.css';
import './../../client/main.scss';
import MainContainer from './MainContainer';
import Dashboard from './dashboard/Dashboard';

export default function App() {
    return (
        <GatewayProvider>
            <MainContainer>
                <Switch>
                    <Route path="/martignas" component={Dashboard} />
                </Switch>
            </MainContainer>
            <GatewayDest name="modal" className="modal-container" />
        </GatewayProvider>
    );
}
