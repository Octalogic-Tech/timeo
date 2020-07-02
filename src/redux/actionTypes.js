// --- UI ACTION TYPES ---
export const TOGGLE_TIME_FORMAT = 'TOGGLE_TIME_FORMAT';

// --- DATA ACTION TYPES ---

// For timezones
export const FETCH_TIMEZONES = 'FETCH_TIMEZONES'; //API CALL
export const SET_TIMEZONES = 'SET_TIMEZONES';

// For baseTimezone
export const GET_BASE_TIMEZONE = 'GET_BASE_TIMEZONE'; //Selector
export const SET_BASE_TIMEZONE = 'SET_BASE_TIMEZONE';

// For trackedTimezones
export const GET_TRACKED_TIMEZONES = 'GET_TRACKED_TIMEZONES'; //Selector
export const ADD_TRACKED_TIMEZONE = 'ADD_TRACKED_TIMEZONE';
export const REMOVE_TRACKED_TIMEZONE = 'REMOVE_TRACKED_TIMEZONE';
export const UPDATE_TRACKED_TIMEZONE = 'UPDATE_TRACKED_TIMEZONE';

// For Offset
export const GET_OFFSET = 'GET_OFFSET'; //Selector
export const SET_OFFSET = 'SET_OFFSET';