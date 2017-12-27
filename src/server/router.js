import { renderToString } from "react-dom/server";
import React from "react";
import { matchPath, StaticRouter } from "react-router-dom";
import App from "./../shared/components/App";
import renderFullPage from "./renderFullPage";

const ROUTES = ["/", "/register", "/martignas/:hotspotSlug"];

export default function router(req, res) {
    const match = ROUTES.reduce(
        (acc, route) => matchPath(req.url, { path: route, exact: false }) || acc,
        null,
    );

    if (!match) {
        res.status(404).send("page not found");
        return;
    }

    const context = {};
    const initialStateFromServer = {};

    const html = renderToString(
        <StaticRouter context={context} location={req.url}>
            <App />
        </StaticRouter>,
    );
    res.status(200).send(renderFullPage(html, initialStateFromServer));
}
