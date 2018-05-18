import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import Marker from './Map/Marker';
import helper from './../../helpers';
import config from './../../config/';
import actions from './../../../client/actions';
import selectors from './../../../client/selectors';
import { mapOverlayIsVisible } from './../../reducers/componentsState';
import { hotspotEdition } from '../../reducers/edition';
import constants from '../../constants';
import './MapArea.scss';

const { PAWN_MARKER } = constants;

class MapArea extends React.Component {
    constructor() {
        super();
        this.onGoogleApiLoaded = this.onGoogleApiLoaded.bind(this);
    }

    componentDidMount() {
        this.props.fetchHotspotsByCity('33273');
    }

    onGoogleApiLoaded({ map, maps }) {
        maps.event.addListener(map, 'click', evt => {
            if (this.props.mapOverlayIsVisible) {
                this.props.newMarkerDropped({
                    latitude: evt.latLng.lat(),
                    longitude: evt.latLng.lng(),
                });
                const { type } = this.props.newSettingUpHotspot;
                if (typeof window !== 'undefined') {
                    // eslint-disable-next-line no-undef
                    const markerToolBarIcon = document.getElementById(
                        `${PAWN_MARKER.ID_PREFIX}${type}`,
                    );
                    markerToolBarIcon.classList.remove('selected');
                }
                this.props.turnOffMapOverlayVisibility();
                this.props.openHotspotAddressModal({
                    subtitle: "L'adresse est-elle exacte ?",
                    inputLabel: "Vous pouvez corrigez l'adresse",
                });
            }
        });
    }

    displayHotspots() {
        const {
            citySlug,
            openHotspotInSPAModal,
            unfocusHotspotMarker,
            focusHotspotMarker,
            history,
        } = this.props;
        return this.props.hotspots.map(hotspot => (
            <Marker
                lat={hotspot.position.latitude}
                lng={hotspot.position.longitude}
                text={helper.generateTitleForMarker(hotspot)}
                key={hotspot.id}
                hotspotId={hotspot.id}
                hotspotSlug={hotspot.slug}
                type={hotspot.type}
                iconType={hotspot.iconType}
                citySlug={citySlug}
                history={history}
                openHotspotInSPAModal={openHotspotInSPAModal}
                tooltipOpen={
                    !!this.props.tooltipOpen.hotspotId &&
                    this.props.tooltipOpen.hotspotId === hotspot.id
                }
                focusHotspotMarker={focusHotspotMarker}
                unfocusHotspotMarker={unfocusHotspotMarker}
            />
        ));
    }

    render() {
        const defaultProps = {
            zoom: 16,
        };

        return (
            <div
                id="MapArea" // required
                className="MapArea"
                ref={elem => {
                    this.rootElement = elem;
                }}>
                <GoogleMapReact
                    style={{ userSelect: 'none' }}
                    bootstrapURLKeys={{
                        key: config.google.mapApiKey,
                        language: 'fr' /* ,
                        v: '3.30', */,
                    }}
                    onGoogleApiLoaded={this.onGoogleApiLoaded}
                    center={this.props.map.center}
                    defaultZoom={defaultProps.zoom}
                    options={{ minZoom: 14 }}
                    className="GoogleMapReact">
                    {this.displayHotspots()}
                </GoogleMapReact>
            </div>
        );
    }
}

MapArea.propTypes = {
    // eslint-disable-next-line
    history: ReactRouterPropTypes.history.isRequired,
    fetchHotspotsByCity: PropTypes.func.isRequired,
    hotspots: PropTypes.arrayOf(
        PropTypes.shape({
            position: PropTypes.object,
            title: PropTypes.string,
            id: PropTypes.string,
        }),
    ),
    focusHotspotMarker: PropTypes.func.isRequired,
    unfocusHotspotMarker: PropTypes.func.isRequired,
    citySlug: PropTypes.string.isRequired,
    openHotspotInSPAModal: PropTypes.func.isRequired,
    newMarkerDropped: PropTypes.func.isRequired,
    openHotspotAddressModal: PropTypes.func.isRequired,
    map: PropTypes.shape({
        center: PropTypes.shape({
            lat: PropTypes.isRequired,
            lng: PropTypes.isRequired,
            forceRefresh: PropTypes.bool,
        }),
    }).isRequired,
    tooltipOpen: PropTypes.shape({
        hotspotId: PropTypes.string,
        show: PropTypes.bool,
    }).isRequired,
    mapOverlayIsVisible: PropTypes.bool.isRequired,
    turnOffMapOverlayVisibility: PropTypes.func.isRequired,
    newSettingUpHotspot: PropTypes.shape({
        type: PropTypes.string,
    }).isRequired,
};

MapArea.defaultProps = {
    hotspots: [],
};

const mapStateToProps = state => ({
    hotspots: selectors.getHotspotsForMap(state),
    map: state.map,
    tooltipOpen: selectors.getMarkerTooltipState(state),
    citySlug: selectors.getCitySlug(state),
    mapOverlayIsVisible: mapOverlayIsVisible(state),
    newSettingUpHotspot: hotspotEdition.getCurrentHotspotEdition(state),
});

const mapDispatchToProps = dispatch => ({
    fetchHotspotsByCity: cityId => {
        dispatch(actions.fetchHotspotsByCity(cityId));
    },
    notifyMapMoved: (lat, lng) => {
        dispatch(actions.mapMoved(lat, lng));
    },
    focusHotspotMarker: hotspotId => {
        dispatch(actions.focusHotspotInMap(hotspotId));
    },
    unfocusHotspotMarker: () => {
        dispatch(actions.unfocusHotspotInMap());
    },
    openHotspotInSPAModal: hotspotId => {
        dispatch(actions.openHotspotInSPAModal(hotspotId));
    },
    newMarkerDropped: (position, type, iconType) => {
        dispatch(actions.newMarkerDropped(position, type, iconType));
    },
    openHotspotAddressModal: modalParams => {
        dispatch(actions.openHotspotAddressModal(modalParams));
    },
    turnOffMapOverlayVisibility: () => {
        dispatch(actions.toggleMapOverlayVisibility(false));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(MapArea);
