import { Store, toImmutable } from 'nuclear-js'
import actionTypes from '../actionTypes'

export default Store({
  getInitialState() {
    return toImmutable({
      error: null,
      items: [],
      isLoading: true
    })
  },

  initialize() {
    this.on(actionTypes.RECEIVE_SEMESTERS_START, receiveSemestersStart)
    this.on(actionTypes.RECEIVE_SEMESTERS_SUCCESS, receiveSemestersSuccess)
    this.on(actionTypes.RECEIVE_SEMESTERS_FAILURE, receiveSemestersFailure)
  }
})

function receiveSemestersStart(state) {
  return state
    .set('error', null)
    .set('items', toImmutable([]))
    .set('isLoading', true)
}

function receiveSemestersSuccess(state, {response}) {
  return state
    .set('items', toImmutable(response))
    .set('isLoading', false)
}

function receiveSemestersFailure(state, {error}) {
  console.log("Receiving list failed", error)
  return state
    .set('error', toImmutable(error))
    .set('isLoading', false)
}
