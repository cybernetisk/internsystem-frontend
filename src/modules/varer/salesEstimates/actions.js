import reactor from './../../../reactor'
import {getSalesEstimates} from './service'

import {
  RECEIVE_SALESESTIMATES_START,
  RECEIVE_SALESESTIMATES_SUCCESS,
  RECEIVE_SALESESTIMATES_FAILURE,
} from './actionTypes'

export function fetchSalesEstimates() {
  reactor.dispatch(RECEIVE_SALESESTIMATES_START)

  getSalesEstimates().then(items => {
    reactor.dispatch(RECEIVE_SALESESTIMATES_SUCCESS, {items})
  }).catch((err) => {
    reactor.dispatch(RECEIVE_SALESESTIMATES_FAILURE, err)
  })
}
