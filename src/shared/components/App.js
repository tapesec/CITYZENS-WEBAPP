import React from 'react';
import { Route, Switch } from 'react-router-dom';

import MainContainer from './MainContainer';
import Dashboard from './dashboard/Dashboard';

export default function App(props) {
    return (
        <MainContainer>
            <Switch>
                <Route path="/:city" component={Dashboard} />
            </Switch>
        </MainContainer>
    );
}
