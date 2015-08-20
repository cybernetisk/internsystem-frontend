import reactor from './../../../reactor'
import {getAccounts} from './service'

import {
  RECEIVE_ACCOUNTS_START,
  RECEIVE_ACCOUNTS_SUCCESS,
  RECEIVE_ACCOUNTS_FAILURE,
} from './actionTypes'

export function fetchAccounts() {
  reactor.dispatch(RECEIVE_ACCOUNTS_START)

  getAccounts().then(items => {
    reactor.dispatch(RECEIVE_ACCOUNTS_SUCCESS, {items})
  }).catch((err) => {
    reactor.dispatch(RECEIVE_ACCOUNTS_FAILURE, err)
  })
}
