import reactor from './../../../reactor'
import {dispatchAsync} from '../../../utils/FluxUtils'

import {getVendors} from './service'

import actionTypes from './actionTypes'

export function fetchVendors() {
  dispatchAsync(getVendors(), {
    request: actionTypes.RECEIVE_VENDORS_START,
    success: actionTypes.RECEIVE_VENDORS_SUCCESS,
    failure: actionTypes.RECEIVE_VENDORS_FAILURE
  })
}
