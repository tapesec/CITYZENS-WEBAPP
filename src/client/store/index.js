import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
// eslint-disable-next-line
import { composeWithDevTools } from 'redux-devtools-extension';
import init from './../sagas/rootSagas';

const sagaMiddleware = createSagaMiddleware();

const configureStore = (reducer, preloadedState) => {
    const store = createStore(
        reducer,
        preloadedState,
        composeWithDevTools(applyMiddleware(sagaMiddleware)),
    );
    sagaMiddleware.run(init);
    return store;
};

export default configureStore;
