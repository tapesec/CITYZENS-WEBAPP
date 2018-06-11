import HotspotPayload from './HotspotPayload';
import constant from './../../../shared/constants';

const { HOTSPOT } = constant;

class MediaHotspotPayload extends HotspotPayload {
    constructor() {
        super();
        this.payload = {};
    }

    set title(title) {
        this.payload.title = title;
    }

    set scope(scope) {
        this.payload.scope = scope ? HOTSPOT.SCOPE.PRIVATE : HOTSPOT.SCOPE.PUBLIC;
    }
}

export default MediaHotspotPayload;
