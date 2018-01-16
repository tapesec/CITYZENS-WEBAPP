import { takeLatest, take, call, put } from 'redux-saga/effects';
import algoliasearch from 'algoliasearch';
import actionTypes from './../actions/actionTypes';
import AlgoliaWrapper from './../services/AlgoliaWrapper';
import actions from './../actions/';
import config from './../../shared/config/';

export function* initAlgolia() {
    const algolia = new AlgoliaWrapper(
        algoliasearch(config.algolia.algoliaApplicationId, config.algolia.algoliaSearchApiKey),
    );
    algolia.initIndex(config.algolia.algoliaHotspotsIndex);

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
