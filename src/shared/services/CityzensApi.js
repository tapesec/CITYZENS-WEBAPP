import fetchWrapper from './FetchWrapper';

const HOTSPOTS_ENDPOINTS = '/hotspots';
const MESSAGES_ENDPOINTS = '/messages';

class CityzenApi {
    constructor(requestService, url = 'http://localhost:3001') {
        this.http = requestService;
        this.url = url;
    }
    // hotspots

    static baseHeader(accessToken) {
        const headers = {
            'Content-Type': 'application/json',
        };

        if (accessToken) headers.Authorization = `bearer ${accessToken}`;

        return headers;
    }

    getHotspots(accessToken, params) {
        let queryStrings = '';
        if (params.north) {
            queryStrings = `?north=${params.north}&west=${params.west}&south=${params.south}&east=${
                params.east
            }`;
        } else if (params.insee) {
            queryStrings = `?insee=${params.insee}`;
        }
        return this.http.request(`${this.url}${HOTSPOTS_ENDPOINTS}${queryStrings}`, {
            method: 'GET',
            headers: CityzenApi.baseHeader(accessToken),
        });
    }

    getHotspot(accessToken, id) {
        return this.http.request(`${this.url}${HOTSPOTS_ENDPOINTS}/${id}`, {
            method: 'GET',
            headers: CityzenApi.baseHeader(accessToken),
        });
    }

    postHotspots(accessToken, payload) {
        return this.http.request(`${this.url}${HOTSPOTS_ENDPOINTS}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `bearer ${accessToken}`,
            },
            body: payload,
        });
    }

    // messages

    getMessages(hotspotId) {
        return this.http.request(
            `${this.url}${HOTSPOTS_ENDPOINTS}/${hotspotId}/${MESSAGES_ENDPOINTS}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );
    }

    postMessages(accessToken, hotspotId, payload) {
        return this.http.request(
            `${this.url}${HOTSPOTS_ENDPOINTS}/${hotspotId}${MESSAGES_ENDPOINTS}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `bearer ${accessToken}`,
                },
                body: payload,
            },
        );
    }
}
export default new CityzenApi(fetchWrapper);
