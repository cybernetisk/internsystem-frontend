import { dispatchAsync } from "../../utils/FluxUtils"
import actionTypes from "./actionTypes"
import AuthService from "./services/AuthService"

export function fetchAuthData() {
  dispatchAsync(AuthService.getAuthData(), {
    request: actionTypes.RECEIVE_AUTHDATA_START,
    success: actionTypes.RECEIVE_AUTHDATA_SUCCESS,
    failure: actionTypes.RECEIVE_AUTHDATA_FAILURE,
  })
}
