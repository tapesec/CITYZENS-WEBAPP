const GENERIC_RETRY_REQUEST =
    'nous venons de recevoir la cause du problème, pouvez vous réessayer un peu plus tard ?';

/* eslint-disable import/prefer-default-export */
export const SNACKBAR = {
    INFO: {
        HOTSPOT_SAVED_SUCCESSFULLY: "Félicitations ! votre nouveau point d'interêt a bien été crée",
        HOTSPOT_UPDATED_SUCCESSFULLY: 'Modification réussie',
        ALERT_HOTSPOT_IMG_UPDATED_SUCCESSFULLY: 'Merci pour votre contribution !',
        MESSAGE_SAVED_SUCCESSFULLY: 'Message mis à jour',
        ALERT_POLL_RECEIVED: 'Merci de nous avoir avertis 😊',
    },
    ERROR: {
        SAVING_HOTSPOT_FAILED: `Oups, nous n'avons pas réussi à sauvegarder votre point d'interêt, ${GENERIC_RETRY_REQUEST}`,
        UPDATING_HOTSPOT_FAILED: `Oups, nous n'avons pas réussi à sauvegarder la modification, ${GENERIC_RETRY_REQUEST}`,
        SAVING_MESSAGE_FAILED: `Oups, nous n'avons pas réussi à sauvegarder votre message, ${GENERIC_RETRY_REQUEST}`,
        ALERT_POLL_FAILED:
            "Nous n'avons pas réussi à soumettre votre avis, pouvez vous réessayer un peu plus tard ? Merci.",
        DELETING_MESSAGE_FAILED: `Suppression echoué`,
    },
}; /* eslint-enable import/prefer-default-export */
