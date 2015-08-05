import reactor from '../../reactor'
import AuthService from './services/AuthService'

import {
  RECEIVE_AUTHDATA_START,
  RECEIVE_AUTHDATA_SUCCESS,
  RECEIVE_AUTHDATA_FAILURE,
} from './actionTypes'

export default {
  fetchAuthData() {
    reactor.dispatch(RECEIVE_AUTHDATA_START)

    AuthService.getAuthData().then((data) => {
      console.log('got data', data)
      reactor.dispatch(RECEIVE_AUTHDATA_SUCCESS, data)
    }).catch((err) => {
      reactor.dispatch(RECEIVE_AUTHDATA_FAILURE, err)
    })
  }
}
