import { dispatchAsync } from "../../../utils/FluxUtils"
import reactor from "./../../../reactor"
import actionTypes from "./actionTypes"
import { getInventoryItems } from "./service"

export function fetchInventoryItems() {
  dispatchAsync(getInventoryItems(), {
    request: actionTypes.RECEIVE_INVENTORYITEMS_START,
    success: actionTypes.RECEIVE_INVENTORYITEMS_SUCCESS,
    failure: actionTypes.RECEIVE_INVENTORYITEMS_FAILURE,
  })
}

export function updateFilters(filters) {
  reactor.dispatch(actionTypes.INVENTORYITEMS_FILTERS, filters)
}

export function clearFilters() {
  reactor.dispatch(actionTypes.INVENTORYITEMS_FILTERS_CLEAR)
}
