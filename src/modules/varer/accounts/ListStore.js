import { Store, toImmutable } from 'nuclear-js'
import actionTypes from './actionTypes'

export default Store({
  getInitialState() {
    return toImmutable({
      items: [],
      error: null,
      isLoading: true
    })
  },

  initialize() {
    this.on(actionTypes.RECEIVE_ACCOUNTS_START, receiveAccountsStart)
    this.on(actionTypes.RECEIVE_ACCOUNTS_SUCCESS, receiveAccountsSuccess)
    this.on(actionTypes.RECEIVE_ACCOUNTS_FAILURE, receiveAccountsFailure)
  }
})

function receiveAccountsStart(state) {
  return state
    .set('items', toImmutable([]))
    .set('error', null)
    .set('isLoading', true)
}

function receiveAccountsSuccess(state, {response}) {
  return state
    .set('items', toImmutable(response))
    .set('isLoading', false)
}

function receiveAccountsFailure(state, {error}) {
  console.log('Receiving list failed', error)
  return state
    .set('error', toImmutable(error))
    .set('isLoading', false)
}
