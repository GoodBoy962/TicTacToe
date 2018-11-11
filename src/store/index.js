import {createStore, combineReducers, applyMiddleware} from 'redux';
import {hashHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import reducers from '../reducers';

export const Store = createStore(
    combineReducers(reducers),
    applyMiddleware(
        logger,
        thunk
    )
);
export const History = syncHistoryWithStore(hashHistory, Store);

export default Store;