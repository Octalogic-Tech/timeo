import { call, put, takeLatest } from 'redux-saga/effects';

import { setTimezones } from './actions/dataActions';

import { fetchData } from '../utils/api'
import { FETCH_TIMEZONES } from './actionTypes';

function* fetchTimezoneSaga(action) {
    try {
        const { data } = yield call(fetchData);
        yield put(setTimezones(data));
    } catch (error) {
        console.error(error);
    }
};

export default function* watchFetchTimezone() {
    yield takeLatest(FETCH_TIMEZONES, fetchTimezoneSaga);
};