import { Store, toImmutable } from 'nuclear-js'
import actionTypes from '../actionTypes'

export default Store({
  getInitialState() {
    return toImmutable({
      data: null,
      error: null,
      isLoading: false
    })
  },

  initialize() {
    this.on(actionTypes.RECEIVE_AUTHDATA_START, receiveAuthDataStart)
    this.on(actionTypes.RECEIVE_AUTHDATA_SUCCESS, receiveAuthDataSuccess)
    this.on(actionTypes.RECEIVE_AUTHDATA_FAILURE, receiveAuthDataFailure)
  }
})

function receiveAuthDataStart(state) {
  return state
    .set('data', null)
    .set('error', null)
    .set('isLoading', true)
}

function receiveAuthDataSuccess(state, {response}) {
  return state
    .set('data', toImmutable(response))
    .set('error', null)
    .set('isLoading', false)
}

function receiveAuthDataFailure(state, {error}) {
  return state
    .set('error', toImmutable(error))
    .set('isLoading', false)
}