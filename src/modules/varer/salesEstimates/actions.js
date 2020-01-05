import { dispatchAsync } from "../../../utils/FluxUtils"
import actionTypes from "./actionTypes"
import { getSalesEstimates } from "./service"

export function fetchSalesEstimates() {
  dispatchAsync(getSalesEstimates(), {
    request: actionTypes.RECEIVE_SALESESTIMATES_START,
    success: actionTypes.RECEIVE_SALESESTIMATES_SUCCESS,
    failure: actionTypes.RECEIVE_SALESESTIMATES_FAILURE,
  })
}
