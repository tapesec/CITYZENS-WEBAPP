import config from '../config';

export default {
    HOTSPOT: {
        TYPE: {
            WALL_MESSAGE: 'WallMessage',
            EVENT: 'Event',
            ALERT: 'Alert',
        },
        ICON: {
            WALL: 'WallIcon',
            EVENT: 'EventIcon',
            ACCIDENT: 'AccidentIcon',
            DESTRUCTION: 'DestructionIcon',
            HANDICAP: 'HandicapIcon',
            ROAD_WORKS: 'RoadWorks',
        },
        SCOPE: {
            PRIVATE: 'private',
            PUBLIC: 'public',
        },
        ALERT: {
            LABEL: {
                ACCIDENT: 'Accident de voie publique ou panne',
                DESTRUCTION: 'Dégradation / vandalisme / déchets',
                HANDICAP: 'Equipements accessibles aux personnes à mobilités réduites',
                ROAD_WORKS: 'Travaux sur la voie publique',
            },
            AVATAR_ICON: {
                ACCIDENT: `https://cdn.filestackcontent.com/ITg6R3D0RKuxmeg4GBjH?policy=${
                    config.fileStack.security.policy
                }&signature=${config.fileStack.security.signature}`,
                DESTRUCTION: `https://cdn.filestackcontent.com/mv3vE6K6T5qWiu3Syu7r?policy=${
                    config.fileStack.security.policy
                }&signature=${config.fileStack.security.signature}`,
                HANDICAP: `https://cdn.filestackcontent.com/eiHWi2RQrmYiTR8zJhLO?policy=${
                    config.fileStack.security.policy
                }&signature=${config.fileStack.security.signature}`,
                ROAD_WORKS: `https://cdn.filestackcontent.com/a4e3l7JbSOOw05HNK5DN?policy=${
                    config.fileStack.security.policy
                }&signature=${config.fileStack.security.signature}`,
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
};
