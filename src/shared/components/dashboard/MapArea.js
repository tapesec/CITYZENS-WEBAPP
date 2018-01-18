import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
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
        return this.props.hotspots.map(hotspot => (
            <Marker
                lat={hotspot.position.latitude}
                lng={hotspot.position.longitude}
                text={hotspot.title}
                key={hotspot.id}
            />
        ));
    }

    render() {
        const defaultProps = {
            center: { lat: 44.8436051, lng: -0.7745152 },
            zoom: 16,
        };
        return (
            <div className="MapArea">
                <GoogleMapReact
                    bootstrapURLKeys={{
                        key: config.google.mapApiKey,
                        language: 'fr',
                    }}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                    options={{ minZoom: 14 }}>
                    {this.displayHotspots()}
                </GoogleMapReact>
            </div>
        );
    }
}

MapArea.propTypes = {
    fetchHotspotsByCity: PropTypes.func.isRequired,
    hotspots: PropTypes.arrayOf(PropTypes.object),
};

MapArea.defaultProps = {
    hotspots: [],
};

const mapStateToProps = state => ({
    hotspots: selectors.getHotspotsForMap(state),
});

const mapDispatchToProps = dispatch => ({
    fetchHotspotsByCity: cityId => {
        dispatch(actions.fetchHotspotsByCity(cityId));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(MapArea);
