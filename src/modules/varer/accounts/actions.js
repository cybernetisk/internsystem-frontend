import reactor from './../../../reactor'
import {dispatchAsync} from '../../../utils/FluxUtils'

import {getAccounts} from './service'

import actionTypes from './actionTypes'

export function fetchAccounts() {
  dispatchAsync(getAccounts(), {
    request: actionTypes.RECEIVE_ACCOUNTS_START,
    success: actionTypes.RECEIVE_ACCOUNTS_SUCCESS,
    failure: actionTypes.RECEIVE_ACCOUNTS_FAILURE
  })
}
