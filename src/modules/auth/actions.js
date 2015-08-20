import reactor from '../../reactor'
import {dispatchAsync} from '../../utils/FluxUtils'

import AuthService from './services/AuthService'

import actionTypes from './actionTypes'

export function fetchAuthData() {
  dispatchAsync(AuthService.getAuthData(), {
    request: actionTypes.RECEIVE_AUTHDATA_START,
    success: actionTypes.RECEIVE_AUTHDATA_SUCCESS,
    failure: actionTypes.RECEIVE_AUTHDATA_FAILURE
  })
}
