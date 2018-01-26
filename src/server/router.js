import { renderToString } from 'react-dom/server';
import React from 'react';
import { matchPath, StaticRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import fetch from 'cross-fetch';
import config from './config';
import cityzenApi from './../shared/services/CityzensApi';
import Hotspots from './services/Hotspots';
import Cities from './services/Cities';
import reducer from './../shared/reducers';
import App from './../shared/components/App';
import renderFullPage from './renderFullPage';

const hotspots = new Hotspots(cityzenApi);
const cities = new Cities(fetch, config.http.apiUrl);

const ROUTES = ['/', '/register', '/:citySlug/:hotspotSlug'];

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
        componentsState: {
            leftSideMenu: {
                open: true,
            },
            map: {
                markerTooltip: {},
            },
            hotspotModal: {
                open: true,
            },
        },
        algolia: {
            hits: [],
            query: '',
            networkError: false,
        },
        hotspots: await hotspots.getPublicHotspots({
            insee: '33273',
        }),
        map: {
            center: {
                lat: 44.84032108,
                lng: -0.77510476,
            },
        },
        city: await cities.getCity(req.params.citySlug),
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
