import React from 'react';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button } from 'rmwc/Button';
import { Fab } from 'rmwc/Fab';
import { IconToggle } from 'rmwc/IconToggle';
import LeftSideMenu from './LeftSideMenu';
import HotspotWindow from './HotspotWindow';
import Map from './Map';
import { Typography } from 'rmwc/Typography';

export default function Dashboard({ match, props }) {
    return (
        <div>
            <LeftSideMenu />
            <Map />
            {match.url}
            <Route
                path={match.url + '/:hotspotSlug'}
                component={HotspotWindow}
            />
        </div>
    );
}
