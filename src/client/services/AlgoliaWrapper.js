class AlgoliaWrapper {
    constructor(client) {
        this.client = client;
    }

    initIndex(indexName) {
        this.index = this.client.initIndex(indexName);
    }

    search(searchParam) {
        return new Promise((resolve, reject) => {
            this.index.search(searchParam, (err, content) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(content);
                }
            });
        });
    }
}
export default AlgoliaWrapper;
