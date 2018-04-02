const CITIES_ENDPOINTS = '/cities';

class Cities {
    constructor(fetchModule, url = 'http://localhost:3001') {
        this.fetch = fetchModule;
        this.url = url;
    }
    async getCity(slug) {
        try {
            const response = await this.fetch(`${this.url}${CITIES_ENDPOINTS}/${slug}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response;
        } catch (err) {
            return Promise.reject(err);
        }
    }
}
export default Cities;
