import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import { TransitionGroup } from 'react-transition-group';
import HotspotContainer from './HotspotContainer';
import LeftSideMenu from './LeftSideMenu/LeftSideMenu';
import MapArea from './MapArea';

export default function Dashboard({ match }) {
    return (
        <Fragment>
            <LeftSideMenu />
            <MapArea />
            <TransitionGroup
                transitionName="fade"
                transitionEnterTimeout={600}
                transitionLeaveTimeout={600}>
                <Route path={match.url + '/:hotspotSlug'} component={HotspotContainer} />
            </TransitionGroup>
        </Fragment>
    );
}
