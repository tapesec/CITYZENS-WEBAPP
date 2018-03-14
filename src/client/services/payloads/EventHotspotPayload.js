import HotspotPayload from './HotspotPayload';
import constant from './../../../shared/constants';

const { HOTSPOT, EDITION_MODE } = constant;

class EventHotspotPayload extends HotspotPayload {
    constructor(settingUpMode) {
        super();
        this.payload = {};
        this.settingUpMode = settingUpMode;
    }

    set hotspotId(id) {
        this.payload.id = id;
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
        if (this.settingUpMode === EDITION_MODE.SETTING_UP) {
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
        if (this.settingUpMode === EDITION_MODE.EDITION) {
            if (this.payload && this.payload.type) {
                if (this.payload.type === HOTSPOT.TYPE.EVENT) {
                    ['dateEnd', 'description', 'scope', 'hotspotId'].forEach(attr => {
                        if (!this.payload[attr])
                            throw new Error('Payload is not fully completed (Event hotspot part)');
                    });
                }
            }
        }
    }
}

export default EventHotspotPayload;
