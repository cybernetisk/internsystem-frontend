import reactor from './../../../reactor'
import {dispatchAsync} from '../../../utils/FluxUtils'

import {getSalesProducts} from './service'

import actionTypes from './actionTypes'

export function fetchSalesProducts(page) {
  dispatchAsync(getSalesProducts(page), {
    request: actionTypes.RECEIVE_SALESPRODUCTS_START,
    success: actionTypes.RECEIVE_SALESPRODUCTS_SUCCESS,
    failure: actionTypes.RECEIVE_SALESPRODUCTS_FAILURE
  }, {page})
}

export function updateFilters(filters) {
  reactor.dispatch(actionTypes.SALESPRODUCTS_FILTERS, filters)
}

export function clearFilters() {
  reactor.dispatch(actionTypes.SALESPRODUCTS_FILTERS_CLEAR)
}
