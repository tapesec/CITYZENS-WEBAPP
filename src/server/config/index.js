const port = process.env.SERVER_FRONT_HTTP_PORT;
const apiUrl = process.env.API_URL;
const domain = process.env.AUTH0_DOMAIN;
const clientId = process.env.AUTH0_CLIENT_ID;
const secret = process.env.AUTH0_SECRET;
const callback = process.env.AUTH0_CALLBACK;
const audience = process.env.AUTH0_AUDIENCE;
const slackWebhookErrorUrl = process.env.SLACK_API_ERROR_WEBHOOK;
const slackLeadWebhook = process.env.SLACK_LEAD_WEBHOOK;
const forceHttps = process.env.FORCE_HTTPS;

module.exports = {
    http: {
        port,
        apiUrl,
        forceHttps,
    },
    auth0: {
        domain,
        clientId,
        secret,
        callback,
        audience,
    },
    slack: {
        slackWebhookErrorUrl,
        slackLeadWebhook,
    },
};
