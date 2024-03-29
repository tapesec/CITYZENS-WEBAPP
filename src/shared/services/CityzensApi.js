import fetchWrapper from './FetchWrapper';
import config from '../config';

const HOTSPOTS_ENDPOINTS = '/hotspots';
const HOTSPOTS_VIEWS_ENDPOINTS = '/views';
const MESSAGES_ENDPOINTS = '/messages';
const COMMENTS_ENDPOINTS = '/comments';
const PERTINENCE_ENDPOINTS = '/pertinence';
const CITYZENS_ENDPOINTS = '/cityzens';

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

    patchHotspots(accessToken, payload, hotspotId) {
        return this.http.request(`${this.url}${HOTSPOTS_ENDPOINTS}/${hotspotId}`, {
            method: 'PATCH',
            headers: CityzenApi.baseHeader(accessToken),
            body: payload,
        });
    }

    postHotspotsViews(accessToken, hotspotId) {
        return this.http.request(
            `${this.url}${HOTSPOTS_ENDPOINTS}/${hotspotId}/${HOTSPOTS_VIEWS_ENDPOINTS}`,
            {
                method: 'POST',
                headers: CityzenApi.baseHeader(accessToken),
            },
        );
    }

    // messages

    getMessages(hotspotId) {
        return this.http.request(
            `${this.url}${HOTSPOTS_ENDPOINTS}/${hotspotId}${MESSAGES_ENDPOINTS}`,
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

    patchMessages(accessToken, hotspotId, messageId, payload) {
        return this.http.request(
            `${this.url}${HOTSPOTS_ENDPOINTS}/${hotspotId}${MESSAGES_ENDPOINTS}/${messageId}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `bearer ${accessToken}`,
                },
                body: payload,
            },
        );
    }

    deleteMessage(accessToken, hotspotId, messageId) {
        return this.http.request(
            `${this.url}${HOTSPOTS_ENDPOINTS}/${hotspotId}${MESSAGES_ENDPOINTS}/${messageId}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `bearer ${accessToken}`,
                },
            },
        );
    }

    getComments(hotspotId, messageId) {
        return this.http.request(
            `${
                this.url
            }${HOTSPOTS_ENDPOINTS}/${hotspotId}${MESSAGES_ENDPOINTS}/${messageId}${COMMENTS_ENDPOINTS}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );
    }

    postComments(accessToken, hotspotId, messageId, payload) {
        return this.http.request(
            `${
                this.url
            }${HOTSPOTS_ENDPOINTS}/${hotspotId}${MESSAGES_ENDPOINTS}/${messageId}${COMMENTS_ENDPOINTS}`,
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

    countComments(hotspotId, messagesIds) {
        return this.http.request(
            `${
                this.url
            }${HOTSPOTS_ENDPOINTS}/${hotspotId}${MESSAGES_ENDPOINTS}?count&messages=${messagesIds}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );
    }

    postPertinence(accessToken, hotspotId, pertinence) {
        return this.http.request(
            `${this.url}${HOTSPOTS_ENDPOINTS}/${hotspotId}${PERTINENCE_ENDPOINTS}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `bearer ${accessToken}`,
                },
                body: pertinence,
            },
        );
    }

    getCityzen(accessToken, userId) {
        const params = userId.split('|'); // provider|uuid
        return this.http.request(
            `${this.url}${CITYZENS_ENDPOINTS}/${params[1]}?provider=${params[0]}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `bearer ${accessToken}`,
                },
            },
        );
    }

    patchCityzen(accessToken, userId, payload) {
        const params = userId.split('|'); // provider|uuid
        return this.http.request(
            `${this.url}${CITYZENS_ENDPOINTS}/${params[1]}?provider=${params[0]}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `bearer ${accessToken}`,
                },
                body: payload,
            },
        );
    }
}
export default new CityzenApi(fetchWrapper, config.cityzensApi.baseUrl);
