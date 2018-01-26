const port = process.env.SERVER_FRONT_HTTP_PORT;
const apiUrl = process.env.API_URL;
const domain = process.env.AUTH0_DOMAIN;
const clientId = process.env.AUTH0_CLIENT_ID;
const secret = process.env.AUTH0_SECRET;
const callback = process.env.AUTH0_CALLBACK;
const audience = process.env.AUTH0_AUDIENCE;

module.exports = {
    http: {
        port,
        apiUrl,
    },
    auth0: {
        domain,
        clientId,
        secret,
        callback,
        audience,
    },
};
