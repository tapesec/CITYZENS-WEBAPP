import { takeLatest, take, call, put } from 'redux-saga/effects';
import algoliasearch from 'algoliasearch';
import actionTypes from './../actions/actionTypes';
import AlgoliaWrapper from './../services/AlgoliaWrapper';
import actions from './../actions/';

export function* initAlgolia() {
    const algolia = new AlgoliaWrapper(
        algoliasearch('PRS3PO0GB2', '70ff404aa7da4a72ace6d2ea89ada561'),
    );
    algolia.initIndex('dev_hotspots');

    while (true) {
        const keyPressAction = yield take(actionTypes.HOTSPOT_SEARCH_KEY_PRESS);
        try {
            const prediction = yield call(
                [algolia, algolia.search],
                keyPressAction.payload.searchValue,
            );
            yield put(actions.displayHits(prediction));
        } catch (err) {
            yield put(actions.algoliaError());
        }
    }
}

export default function* algoliaSearchSagas() {
    yield [takeLatest(actionTypes.LEFT_SIDE_MENU_DID_MOUNT, initAlgolia)];
}
