import express from 'express';
import passport from 'passport';
import Auth0Strategy from 'passport-auth0';
import session from 'express-session';
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
        domain: 'cityzens.eu.auth0.com',
        clientID: 'n131Yxuh4Z5pCHz8tj5ZZkWybvyqnJQd',
        clientSecret: '_zYuOp0VDjNjz4ivkKxsp1wYCWGWveRu4r6r1pJ9VMcIlE7n5C7v3L95uQf5yK_F',
        callbackURL: 'http://localhost:3000/callback',
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
        clientID: 'n131Yxuh4Z5pCHz8tj5ZZkWybvyqnJQd',
        domain: 'cityzens.eu.auth0.com',
        redirectUri: 'http://localhost:3000/callback',
        audience: 'https://cityzens.eu.auth0.com/userinfo',
        responseType: 'code',
        scope: 'openid profile',
    }),
    (req, res) => {
        res.redirect('/');
    },
);
app.get(
    '/callback',
    passport.authenticate('auth0', {
        failureRedirect: '/',
    }),
    (req, res) => {
        res.redirect('/');
    },
);
app.get(['/', '/martignas', '/martignas/:hotspotSlug'], router);

app.listen(3000, () => {
    console.log('ready to serve pages');
});
