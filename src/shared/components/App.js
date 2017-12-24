import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Dashboard from './Dashboard';
import Login from './Login';

export default function App(props) {
    return (
        <div>
            does it works ?
            <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route path="/register" component={Login} />
            </Switch>
        </div>
    );
}
