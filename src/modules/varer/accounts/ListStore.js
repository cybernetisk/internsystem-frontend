import { Store, toImmutable } from 'nuclear-js'
import {
  RECEIVE_ACCOUNTS_START,
  RECEIVE_ACCOUNTS_SUCCESS,
  RECEIVE_ACCOUNTS_FAILURE
} from './actionTypes'

export default Store({
  getInitialState() {
    return toImmutable({
      items: [],
      error: null,
      isLoading: true
    })
  },

  initialize() {
    this.on(RECEIVE_ACCOUNTS_START, receiveAccountsStart)
    this.on(RECEIVE_ACCOUNTS_SUCCESS, receiveAccountsSuccess)
    this.on(RECEIVE_ACCOUNTS_FAILURE, receiveAccountsFailure)
  }
})

function receiveAccountsStart(state) {
  return state
    .set('items', toImmutable([]))
    .set('error', null)
    .set('isLoading', true)
}

function receiveAccountsSuccess(state, {items}) {
  return state
    .set('items', toImmutable(items))
    .set('isLoading', false)
}

function receiveAccountsFailure(state, err) {
  console.log("Receiving list failed", err)
  return state
    .set('error', toImmutable(err))
    .set('isLoading', false)
}
