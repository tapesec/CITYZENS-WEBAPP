import express from 'express';
import passport from 'passport';
import Auth0Strategy from 'passport-auth0';
import session from 'express-session';
import config from './config';
import router from './router';

const app = express();
app.use(
    session({
        secret: 'keyboard cat',
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

app.use('/assets', express.static('build'));

app.get(
    '/login',
    passport.authenticate('auth0', {
        clientID: config.auth0.clientId,
        domain: config.auth0.domain,
        redirectUri: config.auth0.redirect,
        audience: config.auth0.audience,
        responseType: 'code',
        scope: 'openid profile',
    }),
    (req, res) => {
        res.redirect('/martignas');
    },
);
app.get(
    '/callback',
    passport.authenticate('auth0', {
        failureRedirect: '/',
    }),
    (req, res) => {
        res.redirect('/martignas');
    },
);
app.get(['/', '/:citySlug', '/:citySlug/:hotspotSlug'], router);

app.listen(parseInt(config.http.port, 10), () => {
    console.log('ready to serve pages');
});
