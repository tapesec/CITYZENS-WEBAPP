import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import helper from './../../helpers';
import ActionsPanel from './Map/ActionsPanel/ActionsPanel';
import config from './../../config/';
import actions from './../../../client/actions';
import selectors from './../../../client/selectors';
import Marker from './Map/Marker';
import './MapArea.scss';

class MapArea extends React.Component {
    componentDidMount() {
        this.props.fetchHotspotsByCity('33273');
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
            <div className="MapArea">
                <ActionsPanel />
                <GoogleMapReact
                    bootstrapURLKeys={{
                        key: config.google.mapApiKey,
                        language: 'fr',
                    }}
                    onChange={evt => {
                        this.props.notifyMapMoved(evt.center.lat, evt.center.lng);
                    }}
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
    openHotspotInSPAModal: (hotspotId) => {
        dispatch(actions.openHotspotInSPAModal (hotspotId));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(MapArea);
