import reactor from './../../../reactor'
import {dispatchAsync} from '../../../utils/FluxUtils'

import {getInventoryItems} from './service'

import actionTypes from './actionTypes'

export function fetchInventoryItems(page) {
  dispatchAsync(getInventoryItems(page), {
    request: actionTypes.RECEIVE_INVENTORYITEMS_START,
    success: actionTypes.RECEIVE_INVENTORYITEMS_SUCCESS,
    failure: actionTypes.RECEIVE_INVENTORYITEMS_FAILURE
  }, {page})
}

export function updateFilters(filters) {
  reactor.dispatch(actionTypes.INVENTORYITEMS_FILTERS, filters)
}

export function clearFilters() {
  reactor.dispatch(actionTypes.INVENTORYITEMS_FILTERS_CLEAR)
}
