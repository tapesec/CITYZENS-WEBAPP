import { renderToString } from 'react-dom/server';
import React from 'react';
import { matchPath, StaticRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import cityzenApi from './../shared/services/CityzensApi';
import Hotspots from './services/Hotspots';
import reducer from './../shared/reducers';
import App from './../shared/components/App';
import renderFullPage from './renderFullPage';

const hotspots = new Hotspots(cityzenApi);

const ROUTES = ['/', '/register', '/martignas/:hotspotSlug'];

export default (async function router(req, res) {
    const match = ROUTES.reduce(
        (acc, route) => matchPath(req.url, { path: route, exact: false }) || acc,
        null,
    );

    if (!match) {
        res.status(404).send('page not found');
        return;
    }

    const data = {
        authorizedUser: {},
        componentsVisibility: {
            leftSideMenu: {
                open: true,
            },
        },
        algolia: {
            hits: [],
            query: ''
        },
        hotspots: await hotspots.getPublicHotspots({
            north: 44.84966239,
            west: -0.79135895,
            south: 44.83216522,
            east: -0.75003147}
        ),
    };

    if (req.user) {
        data.authorizedUser = req.user;
    }

    const store = createStore(reducer, data);

    const context = {};

    const html = renderToString(
        <StaticRouter context={context} location={req.url}>
            <Provider store={store}>
                <App />
            </Provider>
        </StaticRouter>,
    );
    const initialStateFromServer = store.getState();
    res.status(200).send(renderFullPage(html, initialStateFromServer));
});
