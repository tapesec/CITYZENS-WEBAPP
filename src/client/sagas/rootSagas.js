import { fork } from 'redux-saga/effects';
import algoliaSearchSagas from './algoliaSearchSagas';
import hotspotsSagas from './hotspotsSagas';
import messagesSagas from './messagesSagas';
import mapSagas from './MapSagas';
import routingSagas from './routingSagas';
import geocodingSagas from './geocodingSagas';
import slideshowSagas from './widgets/slideshowSagas';

export default function* init() {
    yield [
        fork(algoliaSearchSagas),
        fork(hotspotsSagas),
        fork(mapSagas),
        fork(routingSagas),
        fork(messagesSagas),
        fork(geocodingSagas),
        fork(slideshowSagas),
    ];
}
