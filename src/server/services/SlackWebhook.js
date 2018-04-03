class SlackWebhook {
    constructor(fetchModule, url) {
        this.fetch = fetchModule;
        this.url = url;
    }

    async alert(message) {
        try {
            const response = await this.fetch(this.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: message,
                }),
            });
            return response;
        } catch (err) {
            return Promise.reject(err);
        }
    }
}
export default SlackWebhook;
