class MessagePayload {
    constructor() {
        this.payload = {
            pinned: false,
        };
    }

    set title(title) {
        this.payload.title = title;
    }

    set body(body) {
        if (body) this.payload.body = body;
        else throw new Error('Invalid parameter for message body');
    }

    set pinned(pinned) {
        if (pinned !== undefined) this.payload.pinned = pinned;
    }

    set parentId(parentId) {
        if (parentId !== undefined) this.payload.parentId = parentId;
    }

    valid() {
        if (this.payload) {
            ['body', 'pinned'].forEach(attr => {
                if (this.payload[attr] === undefined)
                    throw new Error('Message payload is not fully completed');
            });
        }
    }
}

export default MessagePayload;
