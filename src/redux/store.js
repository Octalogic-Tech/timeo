import {
    createStore,
    combineReducers,
    compose,
    applyMiddleware
} from 'redux'

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import createSagaMiddleware from 'redux-saga';
import mySaga from './saga'

import uiReducer from './reducers/uiReducer'
import dataReducer from './reducers/dataReducer';

const initialState = {};

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

const rootReducer = combineReducers({
    UI: uiReducer,
    data: dataReducer
});

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
    persistedReducer,
    initialState,
    compose(
        applyMiddleware(...middleware),
        // Need to remove for production
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

const persistor = persistStore(store);

sagaMiddleware.run(mySaga);

export default store;
export { persistor };