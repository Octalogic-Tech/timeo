export const getBaseTimezone = state => (
    state.data.baseTimezone
);

export const getTrackedTimezones = state => (
    state.data.trackedTimezones || []
);

export const getLastTrackedId = state => {
    let trackedTimezones = state.data.trackedTimezones;
    return (
        trackedTimezones.length > 0 ?
            trackedTimezones[trackedTimezones.length - 1].id
            : 0
    )
};

export const getOffset = state => (
    state.data.offset
);