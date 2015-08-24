import reactor from './../../../reactor'
import {dispatchAsync} from '../../../utils/FluxUtils'

import {getInventoryCounts} from './list/service'

import actionTypes from './actionTypes'

export function fetchInventoryCounts(page) {
  dispatchAsync(getInventoryCounts(page), {
    request: actionTypes.RECEIVE_INVENTORYCOUNTS_START,
    success: actionTypes.RECEIVE_INVENTORYCOUNTS_SUCCESS,
    failure: actionTypes.RECEIVE_INVENTORYCOUNTS_FAILURE
  }, {page})
}
