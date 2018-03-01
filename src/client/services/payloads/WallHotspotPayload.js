import HotspotPayload from './HotspotPayload';

class WallHotspotPayload extends HotspotPayload {
    constructor() {
        super();
        this.payload = {};
    }

    set title(title) {
        this.payload.title = title;
        return this;
    }

    set scope(scope) {
        this.payload.scope = scope;
        return this;
    }
}

export default WallHotspotPayload;
