import * as actions from '../actionTypes'

const initialState = {
    timezones: [],
    baseTimezone: JSON.parse(localStorage.getItem('baseTimezone')) || 'Asia/Kolkata',
    trackedTimezones: JSON.parse(localStorage.getItem('trackedTimezones')) || []
};

const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.SET_BASE_TIMEZONE:
            return { ...state, baseTimezone: action.payload.timezone };

        default: return state;
    }
};

export default dataReducer;