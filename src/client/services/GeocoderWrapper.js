const NOT_FOUND_MESSAGE = 'Aucune addresse postale trouvée';

const geocode = (api, geocodeType, value, postalCode) => {
    const geocodeParam = geocodeType === 'address' ? 'address' : 'location';
    return new Promise((resolve, reject) => {
        const requestParam = {
            [geocodeParam]: value,
        };
        if (geocodeType === 'address') {
            requestParam.componentRestrictions = {
                country: 'FR',
                postalCode,
            };
        }
        api.geocode(requestParam, (results, status) => {
            if (status === 'OK') {
                if (results[0]) {
                    resolve(results[0]);
                } else {
                    resolve(NOT_FOUND_MESSAGE);
                }
            } else {
                reject(new Error(`Erreur geocoding status : ${status}`));
            }
        });
    });
};

class GeocoderWrapper {
    constructor(google) {
        // eslint-disable-next-line
        this.geocoder = new google.maps.Geocoder();
    }

    getAddressByCoords(latLng) {
        return geocode(this.geocoder, 'location', latLng);
    }

    getCoordsByAddress(address, postalCode) {
        return geocode(this.geocoder, 'address', address, postalCode);
    }
}

export default GeocoderWrapper;
