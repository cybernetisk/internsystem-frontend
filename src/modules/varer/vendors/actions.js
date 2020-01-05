import { dispatchAsync } from "../../../utils/FluxUtils"
import actionTypes from "./actionTypes"
import { getVendors } from "./service"

export function fetchVendors() {
  dispatchAsync(getVendors(), {
    request: actionTypes.RECEIVE_VENDORS_START,
    success: actionTypes.RECEIVE_VENDORS_SUCCESS,
    failure: actionTypes.RECEIVE_VENDORS_FAILURE,
  })
}
