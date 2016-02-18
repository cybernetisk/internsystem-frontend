import { Store, toImmutable } from 'nuclear-js'
import actionTypes from '../actionTypes'

export default Store({
  getInitialState() {
    return toImmutable({
      data: null,
      error: null,
      isLoading: true
    })
  },

  initialize() {
    this.on(actionTypes.RECEIVE_EVENT_START, receiveEventStart)
    this.on(actionTypes.RECEIVE_EVENT_SUCCESS, receiveEventSuccess)
    this.on(actionTypes.RECEIVE_EVENT_FAILURE, receiveEventFailure)
  }
})

function receiveEventStart(state) {
  return state
    .set('data', null)
    .set('error', null)
    .set('isLoading', true)
}

function receiveEventSuccess(state, {response}) {
  return state
    .set('data', toImmutable(response))
    .set('isLoading', false)
}

function receiveEventFailure(state, {error}) {
  let msg = error.statusText
  if (error.status === 404) {
    msg = 'Data not found'
  }

  console.log('Receiving list failed', msg)
  return state
    .set('error', toImmutable(msg))
    .set('isLoading', false)
}
