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
    this.on(actionTypes.RECEIVE_STATS_START, receiveStatsStart)
    this.on(actionTypes.RECEIVE_STATS_SUCCESS, receiveStatsSuccess)
    this.on(actionTypes.RECEIVE_STATS_FAILURE, receiveStatsFailure)
  }
})

function receiveStatsStart(state) {
  return state
    .set('data', null)
    .set('error', null)
    .set('isLoading', true)
}

function receiveStatsSuccess(state, {response}) {
  return state
    .set('data', toImmutable(response))
    .set('isLoading', false)
}

function receiveStatsFailure(state, {error}) {
  console.log('Receiving stats failed', error.statusText)
  return state
    .set('error', toImmutable(error))
    .set('isLoading', false)
}
