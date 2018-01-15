import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import actions from './../../../client/actions';
import './MapArea.scss';

class MapArea extends React.Component {
    componentDidMount() {
        this.props.fetchHotspotsInArea({
            north: 44.84966239,
            west: -0.79135895,
            south: 44.83216522,
            east: -0.75003147,
        });
    }

    render() {
        const defaultProps = {
            center: { lat: 44.8436051, lng: -0.7745152 },
            zoom: 17,
        };
        return (
            <div className="MapArea">
                <GoogleMapReact
                    bootstrapURLKeys={{
                        key: 'AIzaSyD5y69pCi1sSbr6KbmPTDSJVkAjItU7w9c',
                        language: 'fr',
                    }}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                />
            </div>
        );
    }
}

MapArea.propTypes = {
    fetchHotspotsInArea: PropTypes.func.isRequired,
};

const mapStateToProps = () => {};

const mapDispatchToProps = dispatch => ({
    fetchHotspotsInArea: (north, west, south, east) => {
        dispatch(actions.fetchHotspotsInArea(north, west, south, east));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(MapArea);
