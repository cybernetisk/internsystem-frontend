import reactor from './../../../reactor'
import {getVendors} from './service'

import {
  RECEIVE_VENDORS_START,
  RECEIVE_VENDORS_SUCCESS,
  RECEIVE_VENDORS_FAILURE,
} from './actionTypes'

export function fetchVendors() {
  reactor.dispatch(RECEIVE_VENDORS_START)

  getVendors().then(items => {
    reactor.dispatch(RECEIVE_VENDORS_SUCCESS, {items})
  }).catch((err) => {
    reactor.dispatch(RECEIVE_VENDORS_FAILURE, err)
  })
}
