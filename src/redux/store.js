import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import uiReducer from './reducers/uiReducer'

const initialState = {};

const middleware = [];

const rootReducer = combineReducers({
    UI: uiReducer
})

const store = createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;