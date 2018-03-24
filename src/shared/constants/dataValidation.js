const VALIDATION = {
    ALL: {
        LABEL: {
            ERROR: 'Ce champ doit être renseigné',
        },
    },
    HOTSPOT: {
        ADDRESS: {
            MAX_LENGTH: 50,
            LABEL: {
                ERROR: `L'adresse ne doit pas faire plus de 50 caractères de long`,
                WARNING:
                    'Vous pouvez toujours mettre un adresse approximative si vous le souhaitez',
            },
        },
        TITLE: {
            MAX_LENGTH: 100,
            LABEL: {
                ERROR: `Pas plus de 100 caractères`,
            },
        },
        ALERT_HOTSPOT: {
            MESSAGE: {
                MAX_LENGTH: 100,
                LABEL: {
                    ERROR: `Pas plus de 100 caractères, ne spoilez pas trop :)`,
                },
            },
        },
    },
    MESSAGE: {
        TITLE: {
            MAX_LENGTH: 100,
            LABEL: {
                ERROR: `Pas plus de 100 caractères`,
            },
        },
        BODY: {
            MAX_LENGTH: 1000,
            LABEL: {
                ERROR: `Pas plus de 1000 caractères`,
            },
        },
    },
};

export default VALIDATION;
