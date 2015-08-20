import reactor from './../../../reactor'
import {dispatchAsync} from '../../../utils/FluxUtils'

import {getSalesEstimates} from './service'

import actionTypes from './actionTypes'

export function fetchSalesEstimates() {
  dispatchAsync(getSalesEstimates(), {
    request: actionTypes.RECEIVE_SALESESTIMATES_START,
    success: actionTypes.RECEIVE_SALESESTIMATES_SUCCESS,
    failure: actionTypes.RECEIVE_SALESESTIMATES_FAILURE
  })
}
