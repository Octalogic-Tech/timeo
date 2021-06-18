import { call, put, takeLatest } from "redux-saga/effects";

import { setTimezones } from "./actions/dataActions";

import { getAllTimezones } from "countries-and-timezones";
import { FETCH_TIMEZONES } from "./actionTypes";

function* fetchTimezoneSaga(action) {
  try {
    const data = yield call(getAllTimezones);
    const dataArr = [];
    Object.keys(data).forEach((key) =>
      dataArr.push({
        name: key,
        data: data[key],
      })
    );
    yield put(setTimezones(dataArr));
  } catch (error) {
    console.error(error);
  }
}

export default function* watchFetchTimezone() {
  yield takeLatest(FETCH_TIMEZONES, fetchTimezoneSaga);
}
