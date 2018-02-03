import keyBy from 'lodash.keyby';

class Hotspots {
    constructor(api) {
        this.api = api;
    }
    async getPublicHotspots(params) {
        try {
            const response = await this.api.getPublicHotspots(params);
            const jsonResponse = await response.json();
            if (response.status !== 200) return Promise.reject(jsonResponse.message);
            return keyBy(jsonResponse, 'id');
        } catch (err) {
            return Promise.reject(err.message);
        }
    }
}
export default Hotspots;