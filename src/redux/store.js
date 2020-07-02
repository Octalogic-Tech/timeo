import {
    createStore,
    combineReducers,
    compose,
    applyMiddleware
} from 'redux'

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
})

const store = createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(...middleware),
        // Need to remove for production
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

sagaMiddleware.run(mySaga);

export default store;