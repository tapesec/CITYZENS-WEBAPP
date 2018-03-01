const VALIDATION = {
    HOTSPOT: {
        ALL: {
            LABEL: {
                ERROR: 'Ce champ doit être renseigné',
            },
        },
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
    },
};

export default VALIDATION;
