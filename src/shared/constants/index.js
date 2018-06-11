import config from '../config';

export default {
    HOTSPOT: {
        TYPE: {
            WALL_MESSAGE: 'WallMessage',
            MEDIA: 'Media',
            EVENT: 'Event',
            ALERT: 'Alert',
        },
        ICON: {
            WALL: 'WallIcon',
            EVENT: 'EventIcon',
        },
        SCOPE: {
            PRIVATE: 'private',
            PUBLIC: 'public',
        },
        MEDIA: {
            AVATAR_ICON: {
                DEFAULT: `https://cdn.filestackcontent.com/${config.hotspot.mediaDefaultIcon}`,
            },
        },
        ALERT: {
            MARKER_TITLE: {
                DEFAULT: "Point d'information",
            },
            AVATAR_ICON: {
                DEFAULT: `https://cdn.filestackcontent.com/${config.hotspot.infoDefaultIcon}`,
            },
        },
    },
    WIDGET: {
        NAME: {
            MEDIA_SLIDE_SHOW: 'MEDIA_SLIDE_SHOW',
        },
    },
    EDITION_MODE: {
        TURNED_OFF: 'TURNED_OFF',
        EDITION: 'EDITION',
        SETTING_UP: 'SETTING_UP',
    },
    PAWN_MARKER: {
        ID_PREFIX: 'pawn-marker-',
        DATA_TYPE: 'pawnMarker',
    },
};
