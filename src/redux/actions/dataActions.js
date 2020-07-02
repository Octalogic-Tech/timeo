import * as actions from '../actionTypes'

export const setBaseTimezone = timezone => ({
    type: actions.SET_BASE_TIMEZONE,
    payload: {
        timezone
    }
});