import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import actions from '../../../client/actions';
import constants from '../../constants/';
import selectors from '../../../client/selectors';
import { mapOverlayIsVisible } from '../../reducers/componentsState';
import { hotspotEdition } from '../../reducers/edition';
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
import cancelHotspotCreationFlow from '../lib/cancelHotspotCreationFlow';

const { PAWN_MARKER } = constants;
class Dashboard extends React.Component {
    componentDidMount() {
        this.dashboardElem.addEventListener('click', evt => {
            // for unfocus map marker's tooltip in map
            if (evt.target.getAttribute('data-type') !== 'map-marker') {
                if (this.props.tooltipOpen.show) {
                    this.props.unfocusHotspotMarker();
                }
            }
            // for disabled pawMarker shadow
            if (
                evt.target.getAttribute('data-type') !== PAWN_MARKER.DATA_TYPE &&
                !evt.path.some(elem => elem.id === 'MapArea')
            ) {
                cancelHotspotCreationFlow(
                    this.props.mapOverlayIsVisible,
                    this.props.newSettingUpHotspot.type,
                    this.props.clearHotspotEdition,
                    this.props.turnOffMapOverlayVisibility,
                );
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
    turnOffMapOverlayVisibility: PropTypes.func.isRequired,
    mapOverlayIsVisible: PropTypes.bool.isRequired,
    clearHotspotEdition: PropTypes.func.isRequired,
    unfocusHotspotMarker: PropTypes.func.isRequired,
    newSettingUpHotspot: PropTypes.shape({
        type: PropTypes.string,
    }).isRequired,
    tooltipOpen: PropTypes.shape({ show: PropTypes.bool }).isRequired,
    /* eslint-enable react/no-typos */
};

const mapStateToProps = state => ({
    mapOverlayIsVisible: mapOverlayIsVisible(state),
    newSettingUpHotspot: hotspotEdition.getCurrentHotspotEdition(state),
    tooltipOpen: selectors.getMarkerTooltipState(state),
});
const mapDispatchToProps = dispatch => ({
    turnOffMapOverlayVisibility: () => {
        dispatch(actions.toggleMapOverlayVisibility(false));
    },
    clearHotspotEdition: () => {
        dispatch(actions.clearHotspotEdition());
    },
    unfocusHotspotMarker: () => {
        dispatch(actions.unfocusHotspotInMap());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
