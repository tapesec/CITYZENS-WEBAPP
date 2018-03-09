const NOT_FOUND_MESSAGE = 'Aucune addresse postale trouvée';

const geocode = (api, geocodeType, value) => {
    const geocodeParam = geocodeType === 'address' ? 'address' : 'location';
    return new Promise((resolve, reject) => {
        api.geocode({ [geocodeParam]: value }, (results, status) => {
            if (status === 'OK') {
                if (results[0]) {
                    // eslint-disable-next-line
                    const address = results[0].address_components;
                    // eslint-disable-next-line
                    console.log(address);
                    // results[1].formatted_address
                    resolve(`${address[0].long_name} ${address[1].long_name}`);
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

    getCoordsByAddress(address) {
        return geocode(this.geocoder, 'address', address);
    }
}

export default GeocoderWrapper;
