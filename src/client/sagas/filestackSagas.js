import { takeLatest, call } from 'redux-saga/effects';
import { client } from 'filestack-react';
import actionTypes from '../actions/actionTypes';
import config from '../../shared/config';

const cli = client.init(config.fileStack.apiKey, {
    policy: config.fileStack.security.policy,
    signature: config.fileStack.security.signature,
});

function* removeImageByHandle(action) {
    try {
        const { imgHandle } = action.payload;
        yield call([cli, cli.remove], imgHandle, {
            policy: config.fileStack.security.policy,
            signature: config.fileStack.security.signature,
        });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(`Une erreur s'est produite lors de la suppresion de l'image ${error.message}`);
    }
}

export default function* filestackSagas() {
    yield [takeLatest(actionTypes.REMOVE_IMAGE_WITH_HANDLE, removeImageByHandle)];
}
