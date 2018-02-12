import React, { Fragment } from 'react';
import Proptypes from 'prop-types';
import { Route } from 'react-router-dom';
import HotspotContainer from './HotspotContainer/HotspotContainer';
import displayWithProps from './../hoc/displayWithProps';
import displayWithRoutes from './../hoc/displayWithRoute';
import loadWithSlug from './../hoc/loadWithSlug';
import isLoading from './../hoc/isLoading';
import LeftSideMenu from './LeftSideMenu/LeftSideMenu';
import MapArea from './MapArea';

export default function Dashboard({ match }) {
    const AlertHotspotContainer = displayWithProps(isLoading(HotspotContainer));

    return (
        <Fragment>
            <LeftSideMenu />
            <MapArea />
            <AlertHotspotContainer />
            <Route
                path={`${match.url}/:hotspotSlug`}
                component={displayWithRoutes(loadWithSlug(isLoading(HotspotContainer)))}
            />
        </Fragment>
    );
}

Dashboard.propTypes = {
    match: Proptypes.shape({
        url: Proptypes.string.isRequired,
    }).isRequired,
};
