import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import HotspotContainer from './HotspotContainer';
import LeftSideMenu from './LeftSideMenu/LeftSideMenu';
import MapArea from './MapArea';

export default function Dashboard({ match }) {
    return (
        <Fragment>
            <LeftSideMenu />
            <MapArea />
            <Route path={match.url + '/:hotspotSlug'} component={HotspotContainer} />
        </Fragment>
    );
}
