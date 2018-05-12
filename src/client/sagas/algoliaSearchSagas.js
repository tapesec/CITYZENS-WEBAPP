import { takeLatest, take, call, put, select } from 'redux-saga/effects';
import algoliasearch from 'algoliasearch';
import { getCity } from '../../shared/reducers/city';
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
        try {
            const city = yield select(getCity);
            const keyPressAction = yield take(actionTypes.HOTSPOT_SEARCH_KEY_PRESS);
            const prediction = yield call([algolia, algolia.search], {
                query: keyPressAction.payload.searchValue,
                filters: `cityId:${city.insee}`,
                aroundLatLng: `${city.position2D.latitude}, ${city.position2D.longitude}`,
                getRankingInfo: true,
            });
            yield put(actions.displayHits(prediction));
        } catch (err) {
            yield put(actions.algoliaError());
        }
    }
}

export default function* algoliaSearchSagas() {
    yield [takeLatest(actionTypes.LEFT_SIDE_MENU_DID_MOUNT, initAlgolia)];
}
