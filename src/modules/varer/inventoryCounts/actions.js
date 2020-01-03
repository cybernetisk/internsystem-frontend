import reactor from './../../../reactor'
import {dispatchAsync} from '../../../utils/FluxUtils'

import {getInventoryCounts, getInventoryCount, getInventoryCountCounts} from './service'

import actionTypes from './actionTypes'

export function fetchInventoryCounts(page) {
  dispatchAsync(getInventoryCounts(page), {
    request: actionTypes.RECEIVE_INVENTORYCOUNTS_START,
    success: actionTypes.RECEIVE_INVENTORYCOUNTS_SUCCESS,
    failure: actionTypes.RECEIVE_INVENTORYCOUNTS_FAILURE
  }, {page})
}

export function fetchInventoryCount(id) {
  dispatchAsync(getInventoryCount(id, true), {
    request: actionTypes.RECEIVE_INVENTORYCOUNT_START,
    success: actionTypes.RECEIVE_INVENTORYCOUNT_SUCCESS,
    failure: actionTypes.RECEIVE_INVENTORYCOUNT_FAILURE
  }, {id})
}

export function fetchInventoryCountSimple(id) {
  dispatchAsync(getInventoryCount(id), {
    request: actionTypes.RECEIVE_INVENTORYCOUNT_START,
    success: actionTypes.RECEIVE_INVENTORYCOUNT_SUCCESS,
    failure: actionTypes.RECEIVE_INVENTORYCOUNT_FAILURE
  }, {id})
}

export function fetchInventoryCountCounts(inventoryCountId) {
  dispatchAsync(getInventoryCountCounts(inventoryCountId), {
    request: actionTypes.RECEIVE_INVENTORYCOUNTCOUNTS_START,
    success: actionTypes.RECEIVE_INVENTORYCOUNTCOUNTS_SUCCESS,
    failure: actionTypes.RECEIVE_INVENTORYCOUNTCOUNTS_FAILURE
  }, {inventoryCountId})
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
