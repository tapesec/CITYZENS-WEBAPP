import keyBy from 'lodash.keyby';

class Hotspots {
    constructor(api) {
        this.api = api;
    }
    async getPublicHotspots(params) {
        try {
            const response = await this.api.getPublicHotspots(params);
            const hotspots = await response.json();
            return keyBy(hotspots, 'id');
        } catch (err) {
            console.log(err);
        }
    }
}
export default Hotspots;
