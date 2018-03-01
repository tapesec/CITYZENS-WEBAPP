import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import Marker from './Map/Marker';
import ActionsPanel from './Map/ActionsPanel/ActionsPanel';
import helper from './../../helpers';
import config from './../../config/';
import actions from './../../../client/actions';
import selectors from './../../../client/selectors';
import './MapArea.scss';

class MapArea extends React.Component {
    constructor() {
        super();
        this.googleMouseCoords = {
            lat: 0,
            lng: 0,
        };
        this.onGoogleApiLoaded = this.onGoogleApiLoaded.bind(this);
    }

    componentDidMount() {
        let dragging = false;
        let markerPreview;
        let markerHotspotType;
        let markerIconType;
        // eslint-disable-next-line
        const mojs = require('mo-js');
        if (typeof window !== 'undefined') {
            // eslint-disable-next-line
            markerPreview = window.document.getElementById('markerPreviewArea');
        }
        this.props.fetchHotspotsByCity('33273');
        this.rootElement.addEventListener('mousemove', evt => {
            evt.preventDefault();
            if (dragging) {
                const x = evt.pageX;
                const y = evt.pageY;
                markerPreview.style.transform = `translate(${x - 26}px,${y - 83}px)`;
            }
        });
        this.rootElement.addEventListener('mousedown', evt => {
            if (evt.target.getAttribute('data-type') === 'draggablePawnMarker') {
                dragging = true;
                const x = evt.pageX;
                const y = evt.pageY;
                markerPreview.style.transform = `translate(${x - 26}px,${y - 83}px)`;
                markerPreview.style.display = 'inline';
                markerPreview.firstChild.src =
                    evt.target.getAttribute('data-img') || evt.target.src;
                markerHotspotType = evt.target.getAttribute('data-hotspot-type');
                markerIconType = evt.target.getAttribute('data-icon-type');
            }
        });
        this.rootElement.addEventListener('mouseup', () => {
            if (dragging) {
                dragging = false;
                if (typeof window !== 'undefined') {
                    const burst = new mojs.Burst({
                        parent: '#markerPreviewArea',
                    });
                    burst.play();
                }
                this.props.newMarkerDropped(
                    {
                        latitude: this.googleMouseCoords.lat,
                        longitude: this.googleMouseCoords.lng,
                    },
                    markerHotspotType,
                    markerIconType,
                );
                this.props.openHotspotAddressModal();
                // markerPreview.style.display = 'none';
            }
        });
    }

    onGoogleApiLoaded({ map, maps }) {
        maps.event.addListener(map, 'mousemove', evt => {
            this.googleMouseCoords = {
                lat: evt.latLng.lat(),
                lng: evt.latLng.lng(),
            };
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
                className="MapArea"
                ref={elem => {
                    this.rootElement = elem;
                }}>
                <ActionsPanel />
                <GoogleMapReact
                    style={{ userSelect: 'none' }}
                    bootstrapURLKeys={{
                        key: config.google.mapApiKey,
                        language: 'fr',
                        v: '3.30',
                    }}
                    onChange={evt => {
                        this.props.notifyMapMoved(evt.center.lat, evt.center.lng);
                    }}
                    onGoogleApiLoaded={this.onGoogleApiLoaded}
                    center={this.props.map.center}
                    defaultZoom={defaultProps.zoom}
                    options={{ minZoom: 14 }}>
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
    notifyMapMoved: PropTypes.func.isRequired,
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
};

MapArea.defaultProps = {
    hotspots: [],
};

const mapStateToProps = state => ({
    hotspots: selectors.getHotspotsForMap(state),
    map: state.map,
    tooltipOpen: selectors.getMarkerTooltipState(state),
    citySlug: selectors.getCitySlug(state),
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
    unfocusHotspotMarker: hotspotId => {
        dispatch(actions.unfocusHotspotInMap(hotspotId));
    },
    openHotspotInSPAModal: hotspotId => {
        dispatch(actions.openHotspotInSPAModal(hotspotId));
    },
    displayMarkerPreview: (img, x, y) => {
        dispatch(actions.displayMarkerDraggablePreview(img, x, y));
    },
    newMarkerDropped: (position, type, iconType) => {
        dispatch(actions.newMarkerDropped(position, type, iconType));
    },
    setNewHotspotType: type => {
        dispatch(actions.setNewHotspotType(type));
    },
    openHotspotAddressModal: () => {
        dispatch(actions.openHotspotAddressModal());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(MapArea);
