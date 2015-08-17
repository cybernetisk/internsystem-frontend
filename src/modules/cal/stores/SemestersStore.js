import { Store, toImmutable } from 'nuclear-js'
import {
  RECEIVE_SEMESTERS_START,
  RECEIVE_SEMESTERS_SUCCESS,
  RECEIVE_SEMESTERS_FAILURE
} from '../actionTypes'

export default Store({
  getInitialState() {
    return toImmutable({
      error: null,
      items: [],
      loading: true
    })
  },

  initialize() {
    this.on(RECEIVE_SEMESTERS_START, receiveSemestersStart)
    this.on(RECEIVE_SEMESTERS_SUCCESS, receiveSemestersSuccess)
    this.on(RECEIVE_SEMESTERS_FAILURE, receiveSemestersFailure)
  }
})

function receiveSemestersStart(state) {
  return state
    .set('error', null)
    .set('items', toImmutable({}))
    .set('loading', true)
}

function receiveSemestersSuccess(state, { list }) {
  return state
    .set('items', toImmutable(list))
    .set('loading', false)
}

function receiveSemestersFailure(state, err) {
  console.log("Receiving list failed", err)
  return state
    .set('error', toImmutable(err))
    .set('loading', false)
}
