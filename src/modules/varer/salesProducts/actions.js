import { dispatchAsync } from "../../../utils/FluxUtils"
import reactor from "./../../../reactor"
import actionTypes from "./actionTypes"
import { getSalesProducts } from "./service"

export function fetchSalesProducts() {
  dispatchAsync(getSalesProducts(), {
    request: actionTypes.RECEIVE_SALESPRODUCTS_START,
    success: actionTypes.RECEIVE_SALESPRODUCTS_SUCCESS,
    failure: actionTypes.RECEIVE_SALESPRODUCTS_FAILURE,
  })
}

export function updateFilters(filters) {
  reactor.dispatch(actionTypes.SALESPRODUCTS_FILTERS, filters)
}

export function clearFilters() {
  reactor.dispatch(actionTypes.SALESPRODUCTS_FILTERS_CLEAR)
}
