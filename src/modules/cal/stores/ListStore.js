import moment from 'moment'
import { Store, toImmutable } from 'nuclear-js'
import {
  RECEIVE_LIST_START,
  RECEIVE_LIST_SUCCESS,
  RECEIVE_LIST_FAILURE
} from '../actionTypes'

export default Store({
  getInitialState() {
    return toImmutable({
      error: null,
      items: [],
      loading: true,
      semester: moment().month() < 7 ? 1 : 2,
      year: moment().year(),
    })
  },

  initialize() {
    this.on(RECEIVE_LIST_START, receiveListStart)
    this.on(RECEIVE_LIST_SUCCESS, receiveListSuccess)
    this.on(RECEIVE_LIST_FAILURE, receiveListFailure)
  }
})

function receiveListStart(state, {year, semester}) {
  return state
    .set('error', null)
    .set('items', toImmutable({}))
    .set('loading', true)
    .set('year', year)
    .set('semester', semester)
}

function receiveListSuccess(state, { list }) {
  return state
    .set('items', toImmutable(list)
      .toOrderedMap()
      .mapKeys((k, v) => v.get('id')))
    .set('loading', false)
}

function receiveListFailure(state, err) {
  console.log("Receiving list failed", err)
  return state
    .set('error', toImmutable(err))
    .set('loading', false)
}