import { Store, toImmutable } from 'nuclear-js'
import {
  RECEIVE_AUTHDATA_START,
  RECEIVE_AUTHDATA_SUCCESS,
  RECEIVE_AUTHDATA_FAILURE
} from '../actionTypes'

export default Store({
  getInitialState() {
    return toImmutable({
      data: null,
      error: null,
      isLoading: false
    })
  },

  initialize() {
    this.on(RECEIVE_AUTHDATA_START, receiveAuthDataStart)
    this.on(RECEIVE_AUTHDATA_SUCCESS, receiveAuthDataSuccess)
    this.on(RECEIVE_AUTHDATA_FAILURE, receiveAuthDataFailure)
  }
})

function receiveAuthDataStart(state) {
  return state
    .set('data', null)
    .set('error', null)
    .set('isLoading', true)
}

function receiveAuthDataSuccess(state, data) {
  return state
    .set('data', toImmutable(data))
    .set('error', null)
    .set('isLoading', false)
}

function receiveAuthDataFailure(state, err) {
  return state
    .set('error', toImmutable(err))
    .set('isLoading', false)
}