import * as actions from "../actionTypes";

const initialState = {
  timezones: [],
  baseTimezone: "Asia/Kolkata",
  trackedTimezones: [],
  offset: 0,
  shareOffset: 0,
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_BASE_TIMEZONE:
      return {
        ...state,
        baseTimezone: action.payload.timezone,
      };

    case actions.ADD_TRACKED_TIMEZONE:
      return {
        ...state,
        trackedTimezones: [
          ...state.trackedTimezones,
          {
            id: action.payload.id,
            timezone: action.payload.timezone,
          },
        ],
      };

    case actions.REMOVE_TRACKED_TIMEZONE:
      return {
        ...state,
        trackedTimezones: state.trackedTimezones.filter(
          (tz) => tz.id !== action.payload.id
        ),
      };

    case actions.UPDATE_TRACKED_TIMEZONE:
      return {
        ...state,
        trackedTimezones: state.trackedTimezones.map((tz) =>
          tz.id !== action.payload.id
            ? tz
            : {
                id: tz.id,
                timezone: action.payload.timezone,
              }
        ),
      };

    case actions.SET_TRACKED_TIMEZONES:
      return {
        ...state,
        trackedTimezones: action.payload.timezones,
      };

    case actions.SET_OFFSET:
      return {
        ...state,
        offset: action.payload.offset,
      };

    case actions.SET_SHARE_OFFSET:
      return {
        ...state,
        shareOffset: action.payload.offset,
      };

    case actions.SET_TIMEZONES:
      return {
        ...state,
        timezones: action.payload.timezones,
      };

    default:
      return state;
  }
};

export default dataReducer;
