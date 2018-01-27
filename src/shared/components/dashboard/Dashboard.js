import React, { Fragment } from 'react';
import Proptypes from 'prop-types';
import { Route } from 'react-router-dom';
import HotspotContainer from './HotspotContainer/HotspotContainer';
import LeftSideMenu from './LeftSideMenu/LeftSideMenu';
import MapArea from './MapArea';

export default function Dashboard({ match }) {
    return (
        <Fragment>
            <LeftSideMenu />
            <MapArea />
                <Route path={`${match.url}/:hotspotSlug`} component={HotspotContainer} />
        </Fragment>
    );
}

Dashboard.propTypes = {
    match: Proptypes.shape({
        url: Proptypes.string.isRequired
    }).isRequired
};
