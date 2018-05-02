import React from 'react';
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
import HotspotDescriptionModal from './HotspotDescriptionModal/Modal';
import SettingUpHotspotModal from './SettingUpHotspotModal/SettingUpHotspot';

class Dashboard extends React.Component {
    componentDidMount() {
        let previewSelectedPawnMarker;
        this.dashboardElem.addEventListener('click', evt => {
            if (previewSelectedPawnMarker && previewSelectedPawnMarker !== evt.target) {
                previewSelectedPawnMarker.classList.remove('selected');
            }
            if (evt.target.getAttribute('data-type') === 'pawnMarker') {
                previewSelectedPawnMarker = evt.target;
                evt.target.classList.toggle('selected');
            }
        });
    }

    render() {
        const { match, history } = this.props;
        const AlertHotspotContainer = displayWithProps(isLoading(HotspotContainer));

        return (
            <div
                ref={node => {
                    this.dashboardElem = node;
                }}>
                <LeftSideMenu />
                <MapArea history={history} />
                <AlertHotspotContainer />
                <AddressModal />
                <HotspotDescriptionModal />
                <SettingUpHotspotModal />
                <Route
                    path={`${match.url}/:hotspotSlug`}
                    component={displayWithRoutes(loadWithSlug(isLoading(HotspotContainer)))}
                />
                <MarkerDraggablePreview />
            </div>
        );
    }
}

Dashboard.propTypes = {
    /* eslint-disable react/no-typos */
    match: ReactRouterPropTypes.match.isRequired,
    history: ReactRouterPropTypes.history.isRequired,
    /* eslint-enable react/no-typos */
};

export default Dashboard;
