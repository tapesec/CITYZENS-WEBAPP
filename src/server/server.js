import express from 'express';
import passport from 'passport';
import Auth0Strategy from 'passport-auth0';
import session from 'express-session';
import sessionFileStore from 'session-file-store';
import fetch from 'cross-fetch';
import useragent from 'express-useragent';
import config from './config';
import router from './router';
import SlackWebhook from './services/SlackWebhook';
import render500 from './views/templates/error-500';
import render404 from './views/templates/error-404';

import Hotspots from './services/Hotspots';
import Cities from './services/Cities';
import Cityzens from './services/Cityzens';
import Messages from './services/Messages';
import cityzenApi from './../shared/services/CityzensApi';
import InitialState from './InitialState';

import { LOGIN_ENDPOINT } from './constants';

const hotspots = new Hotspots(cityzenApi);
const messages = new Messages(cityzenApi);
const cityzens = new Cityzens(cityzenApi);
const cities = new Cities(fetch, config.http.apiUrl);
const initialState = new InitialState(hotspots, messages, cities, cityzens);
const slackWebhook = new SlackWebhook(fetch, config.slack.slackWebhookErrorUrl);

const app = express();
const FileStore = sessionFileStore(session);

app.use(
    session({
        secret: 'keyboard cat',
        store: new FileStore(),
        resave: false,
        saveUninitialized: false,
        cookie: {},
    }),
);
// Configure Passport to use Auth0
const strategy = new Auth0Strategy(
    {
        domain: config.auth0.domain,
        clientID: config.auth0.clientId,
        clientSecret: config.auth0.secret,
        callbackURL: config.auth0.callback,
    },
    (accessToken, refreshToken, extraParams, profile, done) =>
        done(null, { accessToken, refreshToken, profile }),
);
passport.use(strategy);

// This can be used to keep a smaller payload
passport.serializeUser((userInfo, done) => {
    done(null, userInfo);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

// ...
app.use(passport.initialize());
app.use(passport.session());

// Parse incoming request user-agent …
app.use(useragent.express());

if (process.env.NODE_ENV === 'development') {
    app.use('/assets', express.static('build'));
} else {
    app.use('/assets', express.static('dist'));
}

app.get(
    LOGIN_ENDPOINT,
    passport.authenticate('auth0', {
        clientID: config.auth0.clientId,
        domain: config.auth0.domain,
        redirectUri: config.auth0.redirect,
        audience: config.auth0.audience,
        responseType: 'code',
        scope: 'openid profile email name',
    }),
    (req, res) => {
        res.redirect('/Martignas-sur-Jalle');
    },
);
app.get(
    '/callback',
    passport.authenticate('auth0', {
        failureRedirect: '/',
    }),
    (req, res) => {
        res.redirect('/Martignas-sur-Jalle');
    },
);

app.get('/favicon.ico', (req, res) => {
    res.send('nada');
});

app.get(
    '/profile/:userId',
    initialState.defaultState.bind(initialState),
    initialState.getProfile.bind(initialState),
    router,
);

app.get(
    ['/', '/:citySlug'],
    initialState.defaultState.bind(initialState),
    initialState.getDashboard.bind(initialState),
    router,
);

app.get(
    '/:citySlug/:hotspotSlug',
    initialState.defaultState.bind(initialState),
    initialState.getDashboard.bind(initialState),
    initialState.readHotspot.bind(initialState),
    router,
);

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
    if (error.statusCode === 404) {
        return res.send(render404(error.message));
    }
    slackWebhook.alert(
        `[${process.env.NODE_ENV}] Erreur 500 renvoyé : ${error.message ||
            JSON.stringify(error)}\n\n
        remote ip: ${req.ip}, x-forwarded-for: ${req.ips}, user-agent: ${JSON.stringify({
            ...req.useragent,
        })}`,
    );
    return res.send(render500(error.message || JSON.stringify(error)));
});

app.listen(parseInt(config.http.port, 10), () => {
    console.log('ready to serve pages'); // eslint-disable-line
});
