import reactor from './../../../reactor'
import {dispatchAsync} from '../../../utils/FluxUtils'

import {getInventoryItems} from '../inventoryItems/service'
import {getInventoryCounts, getInventoryCount} from './service'

import actionTypes from './actionTypes'

export function fetchInventoryCounts(page) {
  dispatchAsync(getInventoryCounts(page), {
    request: actionTypes.RECEIVE_INVENTORYCOUNTS_START,
    success: actionTypes.RECEIVE_INVENTORYCOUNTS_SUCCESS,
    failure: actionTypes.RECEIVE_INVENTORYCOUNTS_FAILURE
  }, {page})
}

export function fetchInventoryCount(id) {
  dispatchAsync(getInventoryCount(id), {
    request: actionTypes.RECEIVE_INVENTORYCOUNT_START,
    success: actionTypes.RECEIVE_INVENTORYCOUNT_SUCCESS,
    failure: actionTypes.RECEIVE_INVENTORYCOUNT_FAILURE
  }, {id})
}

export function vareAdded(countId, vare) {
  reactor.dispatch(actionTypes.VARE_ADDED, {countId, vare})
}

export function updateFilters(filters) {
  reactor.dispatch(actionTypes.INVENTORYCOUNT_FILTERS, filters)
}

export function clearFilters() {
  reactor.dispatch(actionTypes.INVENTORYCOUNT_FILTERS_CLEAR)
}
