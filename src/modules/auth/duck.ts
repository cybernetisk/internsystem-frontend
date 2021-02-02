import { call, put, takeLatest } from "redux-saga/effects"
import { createAsyncAction, createReducer } from "typesafe-actions"
import { getAuthData } from "./api"
import { AuthData, AuthState } from "./types"

export const fetchAuthAsync = createAsyncAction(
  "auth/RECEIVE_AUTHDATA_START",
  "auth/RECEIVE_AUTHDATA_SUCCESS",
  "auth/RECEIVE_AUTHDATA_FAILURE",
)<undefined, AuthData, Error>()

export const authActions = fetchAuthAsync

function* fetchAuth() {
  try {
    const data = yield call(getAuthData)
    yield put(fetchAuthAsync.success(data))
  } catch (e) {
    yield put(fetchAuthAsync.failure(e))
  }
}

export function* authSagas() {
  yield takeLatest(fetchAuthAsync.request, fetchAuth)
}

const initialState: AuthState = {
  data: null,
  error: null,
  isLoading: false,
}

export const authReducer = createReducer(initialState)
  .handleAction(fetchAuthAsync.request, (state) => ({
    ...state,
    data: null,
    error: null,
    isLoading: true,
  }))
  .handleAction(fetchAuthAsync.success, (state, { payload }) => ({
    ...state,
    data: payload,
    error: null,
    isLoading: false,
  }))
  .handleAction(fetchAuthAsync.failure, (state, { payload }) => ({
    ...state,
    error: payload,
    isLoading: false,
  }))
