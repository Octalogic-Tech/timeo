import * as actions from '../actionTypes'

// For baseTimeZone
export const setBaseTimezone = timezone => ({
    type: actions.SET_BASE_TIMEZONE,
    payload: {
        timezone
    }
});

// For trackedTimeZones
export const addTrackedTimezone = (id, timezone) => ({
    type: actions.ADD_TRACKED_TIMEZONE,
    payload: {
        id,
        timezone
    }
});

export const removeTrackedTimezone = id => ({
    type: actions.REMOVE_TRACKED_TIMEZONE,
    payload: {
        id
    }
});

export const updateTrackedTimezone = (id, timezone) => ({
    type: actions.UPDATE_TRACKED_TIMEZONE,
    payload: {
        id,
        timezone
    }
});

// For Offset
export const setOffset = offset => ({
    type: actions.SET_OFFSET,
    payload: {
        offset
    }
});