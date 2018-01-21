import { fork } from 'redux-saga/effects';
import algoliaSearchSagas from './algoliaSearchSagas';
import hotspotsSagas from './hotspotsSagas';
import mapSagas from './MapSagas';

export default function* init() {
    yield [fork(algoliaSearchSagas), fork(hotspotsSagas), fork(mapSagas)];
}
