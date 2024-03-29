import { renderToString } from 'react-dom/server';
import React from 'react';
import { matchPath, StaticRouter, Route } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './../shared/reducers';
import App from './../shared/components/App';
import renderFullPage from './renderFullPage';

const ROUTES = ['/', '/register', '/profile/:userId', '/:citySlug/:hotspotSlug'];

export default (async function router(req, res) {
    const match = ROUTES.reduce(
        (acc, route) => matchPath(req.url, { path: route, exact: false }) || acc,
        null,
    );

    if (!match) {
        res.status(404).send('page not found');
        return;
    }

    const store = createStore(reducer, req.initialState);

    const context = {};

    const html = renderToString(
        <StaticRouter context={context} location={req.url}>
            <Provider store={store}>
                <Route path="/" component={App} />
            </Provider>
        </StaticRouter>,
    );
    const initialStateFromServer = store.getState();
    res.status(200).send(renderFullPage(html, initialStateFromServer));
});
