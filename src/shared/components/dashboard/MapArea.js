import React from 'react';
import GoogleMapReact from 'google-map-react';
import './MapArea.scss';

export default function MapArea() {
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
