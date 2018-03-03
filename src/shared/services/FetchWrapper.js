import fetch from 'cross-fetch';

class FetchWrapper {
    constructor(fetchLib) {
        this.fetch = fetchLib;
    }

    request(url, options) {
        return this.fetch(url, options).then(response => {
            if (response.status >= 200 && response.status <= 400) {
                return response;
            }
            return Promise.reject(response.status);
        });
    }
}

export default new FetchWrapper(fetch);
