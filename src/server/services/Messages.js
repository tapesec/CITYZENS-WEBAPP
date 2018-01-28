import keyBy from 'lodash.keyby';

class Messages {
    constructor(api) {
        this.api = api;
    }
    async getMessages(hotspotId) {
        try {
            const response = await this.api.getMessages(hotspotId);
            const jsonResponse = await response.json();
            if (response.status !== 200) return Promise.reject(jsonResponse.message);
            return keyBy(jsonResponse, 'id');
        } catch (err) {
            return Promise.reject(err.message);
        }
    }
}
export default Messages;
