import moment from 'moment'
import { Store, toImmutable } from 'nuclear-js'
import actionTypes from '../actionTypes'

export default Store({
  getInitialState() {
    return toImmutable({
      error: null,
      items: [],
      isLoading: true,
      semester: moment().month() < 7 ? 1 : 2,
      year: moment().year(),
    })
  },

  initialize() {
    this.on(actionTypes.RECEIVE_LIST_START, receiveListStart)
    this.on(actionTypes.RECEIVE_LIST_SUCCESS, receiveListSuccess)
    this.on(actionTypes.RECEIVE_LIST_FAILURE, receiveListFailure)
  }
})

function receiveListStart(state, {year, semester}) {
  return state
    .set('error', null)
    .set('items', toImmutable({}))
    .set('isLoading', true)
    .set('year', year)
    .set('semester', semester)
}

function receiveListSuccess(state, {response}) {
  return state
    .set('items', toImmutable(response)
      .toOrderedMap()
      .mapKeys((k, v) => v.get('id')))
    .set('isLoading', false)
}

function receiveListFailure(state, {error}) {
  console.log("Receiving list failed", error)
  return state
    .set('error', toImmutable(error))
    .set('isLoading', false)
}