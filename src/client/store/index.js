import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import init from './../sagas/rootSagas';

const sagaMiddleware = createSagaMiddleware();

const configureStore = (reducer, preloadedState) => {
    const store = createStore(reducer, preloadedState, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(init);
    return store;
};

export default configureStore;
