import { fork } from 'redux-saga/effects';
import algoliaSearchSagas from './algoliaSearchSagas';
import hotspotsSagas from './hotspotsSagas';
import messagesSagas from './messagesSagas';
import commentsSagas from './commentsSagas';
import mapSagas from './MapSagas';
import routingSagas from './routingSagas';
import geolocalisationSagas from './geolocalisationSagas';
import slideshowSagas from './widgets/slideshowSagas';
import filestackSagas from './filestackSagas';
import leadSagas from './leadSagas';
import googleAnalyticsSagas from './googleAnalyticsSagas';
import profileSagas from './profileSagas';

export default function* init() {
    yield [
        fork(algoliaSearchSagas),
        fork(hotspotsSagas),
        fork(mapSagas),
        fork(routingSagas),
        fork(messagesSagas),
        fork(geolocalisationSagas),
        fork(slideshowSagas),
        fork(filestackSagas),
        fork(commentsSagas),
        fork(leadSagas),
        fork(googleAnalyticsSagas),
        fork(profileSagas),
    ];
}
