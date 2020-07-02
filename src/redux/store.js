import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import uiReducer from './reducers/uiReducer'
import dataReducer from './reducers/dataReducer';

const initialState = {};

const middleware = [];

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
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;