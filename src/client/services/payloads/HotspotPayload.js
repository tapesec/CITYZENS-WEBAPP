import constant from './../../../shared/constants';

const { HOTSPOT } = constant;

class HotspotPayload {
    constructor() {
        this.payload = {};
    }

    set cityId(cityId) {
        if (cityId) this.payload.cityId = cityId;
        else throw new Error('cityId must be set');
    }

    set type(type) {
        if (type) this.payload.type = type;
        else throw new Error('Invalid parameter for address');
    }

    set position(position) {
        if (position && position.latitude && position.longitude) {
            this.payload.position = {
                latitude: position.latitude,
                longitude: position.longitude,
            };
        } else {
            throw new Error('Invalid parameter for position');
        }
    }

    set address(address) {
        if (address && address.city && address.name) {
            this.payload.address = address;
        } else {
            throw new Error('Invalid parameter for address');
        }
    }

    set iconType(iconType) {
        this.payload.iconType = iconType;
    }

    valid() {
        if (this.payload && this.payload.type) {
            ['type', 'iconType', 'address', 'position', 'cityId'].forEach(attr => {
                if (!this.payload[attr])
                    throw new Error('Payload is not fully completed (hotspot part)');
            });
            if (this.payload.type === (HOTSPOT.TYPE.WALL_MESSAGE || HOTSPOT.TYPE.EVENT)) {
                ['title', 'scope'].forEach(attr => {
                    if (!this.payload[attr])
                        throw new Error('Payload is not fully completed (media hotspot part)');
                });
            }
        }
    }
}

export default HotspotPayload;
