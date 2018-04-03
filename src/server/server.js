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
import Messages from './services/Messages';
import cityzenApi from './../shared/services/CityzensApi';
import InitialState from './InitialState';

const hotspots = new Hotspots(cityzenApi);
const messages = new Messages(cityzenApi);
const cities = new Cities(fetch, config.http.apiUrl);
const initialState = new InitialState(hotspots, cities, messages);
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
app.use((req, res, next) => {
    const source = req.headers['user-agent'];
    const ua = useragent.parse(source);
    req.ua = JSON.stringify(ua);
    next();
});

if (process.env.NODE_ENV === 'development') {
    app.use('/assets', express.static('build'));
} else {
    app.use('/assets', express.static('dist'));
}

app.get(
    '/login',
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

app.get('/:citySlug', initialState.defaultState.bind(initialState), router);

app.get(
    '/:citySlug/:hotspotSlug',
    initialState.defaultState.bind(initialState),
    initialState.readHotspot.bind(initialState),
    router,
);

app.use(async (error, req, res) => {
    if (error.statusCode === 404) {
        return res.send(render404(error.message));
    }
    slackWebhook.alert(
        `[${process.env.NODE_ENV}] Erreur 500 renvoyé : ${error.message || error}\n\n
        remote ip: ${req.ip}, x-forwarded-for: ${req.ips}, user-agent: ${req.ua}`,
    );
    return res.send(render500(error.message || error));
});

app.listen(parseInt(config.http.port, 10), () => {
    console.log('ready to serve pages'); // eslint-disable-line
});
