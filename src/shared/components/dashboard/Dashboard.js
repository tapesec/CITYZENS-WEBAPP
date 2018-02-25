import React, { Fragment } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Route } from 'react-router-dom';
import MarkerDraggablePreview from './Map/ActionsPanel/MarkerDraggablePreview';
import HotspotContainer from './HotspotContainer/HotspotContainer';
import displayWithProps from './../hoc/displayWithProps';
import displayWithRoutes from './../hoc/displayWithRoute';
import loadWithSlug from './../hoc/loadWithSlug';
import isLoading from './../hoc/isLoading';
import LeftSideMenu from './LeftSideMenu/LeftSideMenu';
import MapArea from './MapArea';
import AddressModal from './AddressModal/AddressModal';

export default function Dashboard({ match, history }) {
    const AlertHotspotContainer = displayWithProps(isLoading(HotspotContainer));

    return (
        <Fragment>
            <LeftSideMenu />
            <MapArea history={history} />
            <AlertHotspotContainer />
            <AddressModal />
            <Route
                path={`${match.url}/:hotspotSlug`}
                component={displayWithRoutes(loadWithSlug(isLoading(HotspotContainer)))}
            />
            <MarkerDraggablePreview />
        </Fragment>
    );
}

Dashboard.propTypes = {
    /* eslint-disable react/no-typos */
    match: ReactRouterPropTypes.match.isRequired,
    history: ReactRouterPropTypes.history.isRequired,
    /* eslint-enable react/no-typos */
};
