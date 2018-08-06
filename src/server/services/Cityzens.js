class Cityzens {
    constructor(api) {
        this.api = api;
    }
    async getCityzen(accessToken, userId) {
        try {
            const response = await this.api.getCityzen(accessToken, userId);
            return response;
        } catch (err) {
            return Promise.reject(err.message);
        }
    }
}
export default Cityzens;
