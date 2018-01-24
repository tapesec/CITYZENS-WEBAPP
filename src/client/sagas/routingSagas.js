import { BrowserRouter } from 'react-router-dom';
import { takeLatest } from 'redux-saga/effects';
import actionTypes from '../actions/actionTypes';

export function* redirect(action) {
    const { path } = action.payload;
    yield BrowserRouter.push(path);
}

export default function* routingSagas() {
    yield [takeLatest(actionTypes.REDIRECT_TO, redirect)];
}
