import { takeLatest, take } from 'redux-saga/effects';
import algoliasearch from 'algoliasearch';
import actionTypes from './../actions/actionTypes';

export function* initAlgolia() {
    const client = algoliasearch('PRS3PO0GB2', '70ff404aa7da4a72ace6d2ea89ada561');
    const index = client.initIndex('getstarted_actors');

    while (true) {
        const action = yield take(actionTypes.HOTSPOT_SEARCH_KEY_PRESS);
        index.search({ query: action.payload.searchValue }, (err, content) => {
            if (err) {
                console.error(err);
                return;
            }

            for (var h in content.hits) {
                console.log(`Hit(${content.hits[h].objectID}): ${content.hits[h].toString()}`);
            }
        });
    }
}

export default function* algoliaSearchSagas() {
    yield [takeLatest(actionTypes.LEFT_SIDE_MENU_DID_MOUNT, initAlgolia)];
}
