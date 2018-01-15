import fetch from 'cross-fetch';

const HOTSPOTS_ENDPOINTS = '/hotspots';

class CityzenApi {
    constructor(fetchModule, url = 'http://localhost:3000') {
        this.fetch = fetchModule;
        this.url = url;
    }

    getPublicHotspots(params) {
        let queryStrings = '';
        if (params.north) {
            queryStrings = `?north=${params.north}&west=${params.west}&south=${params.south}&east=${params.east}`;
            console.log(queryStrings)
        } else if (params.insee) {
            queryStrings = `?insee=${params.insee}`;
        }
        return this.fetch(`${this.url}${HOTSPOTS_ENDPOINTS}${queryStrings}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
export default new CityzenApi(fetch);
