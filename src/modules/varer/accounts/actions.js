import { dispatchAsync } from "../../../utils/FluxUtils"
import actionTypes from "./actionTypes"
import { getAccounts } from "./service"

export function fetchAccounts() {
  dispatchAsync(getAccounts(), {
    request: actionTypes.RECEIVE_ACCOUNTS_START,
    success: actionTypes.RECEIVE_ACCOUNTS_SUCCESS,
    failure: actionTypes.RECEIVE_ACCOUNTS_FAILURE,
  })
}
