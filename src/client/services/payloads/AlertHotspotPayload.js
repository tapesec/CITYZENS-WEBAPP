import HotspotPayload from './HotspotPayload';

class MessageHotspotPayload extends HotspotPayload {
    constructor() {
        super();
        this.payload = {};
    }

    set message(message) {
        this.payload.message = message;
    }

    set pictureDescription(imgHandle) {
        if (imgHandle) this.payload.pictureDescription = imgHandle;
    }

    valid() {
        super.valid();
        ['message'].forEach(attr => {
            if (!this.payload[attr])
                throw new Error('Payload is not fully completed (Alert hotspot part)');
        });
    }
}

export default MessageHotspotPayload;
