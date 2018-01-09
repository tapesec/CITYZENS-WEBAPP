import { fork } from 'redux-saga/effects';
import algoliaSearchSagas from './algoliaSearchSagas';

export default function* init() {
    yield [fork(algoliaSearchSagas)];
}
