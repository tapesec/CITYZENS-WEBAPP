import HotspotPayload from './HotspotPayload';
import constant from './../../../shared/constants';

const { HOTSPOT } = constant;

class EventHotspotPayload extends HotspotPayload {
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

    set dateEnd(date) {
        this.payload.dateEnd = date;
    }

    set description(description) {
        this.payload.description = description;
    }

    valid() {
        super.valid();
        if (this.payload && this.payload.type) {
            if (this.payload.type === HOTSPOT.TYPE.EVENT) {
                ['dateEnd', 'description'].forEach(attr => {
                    if (!this.payload[attr])
                        throw new Error('Payload is not fully completed (Event hotspot part)');
                });
            }
        }
    }
}

export default EventHotspotPayload;
