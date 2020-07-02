import * as actions from '../actionTypes'

const initialState = {
    twentyFourHour: false
};

const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.TOGGLE_TIME_FORMAT:
            return { ...state, twentyFourHour: !state.twentyFourHour };

        default: return state;
    };
};

export default uiReducer;