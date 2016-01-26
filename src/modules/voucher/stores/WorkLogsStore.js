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
    this.on(actionTypes.RECEIVE_WORKLOGS_START, receiveWorkLogsStart)
    this.on(actionTypes.RECEIVE_WORKLOGS_SUCCESS, receiveWorkLogsSuccess)
    this.on(actionTypes.RECEIVE_WORKLOGS_FAILURE, receiveWorkLogsFailure)
  }
})

function receiveWorkLogsStart(state) {
  return state
    .set('data', null)
    .set('error', null)
    .set('isLoading', true)
}

function receiveWorkLogsSuccess(state, {response}) {
  return state
    .set('data', toImmutable(response))
    .set('isLoading', false)
}

function receiveWorkLogsFailure(state, {error}) {
  console.log("Receiving work logs failed", error.statusText)
  return state
    .set('error', toImmutable(error))
    .set('isLoading', false)
}
