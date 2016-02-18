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
    this.on(actionTypes.RECEIVE_VENDORS_START, receiveVendorsStart)
    this.on(actionTypes.RECEIVE_VENDORS_SUCCESS, receiveVendorsSuccess)
    this.on(actionTypes.RECEIVE_VENDORS_FAILURE, receiveVendorsFailure)
  }
})

function receiveVendorsStart(state) {
  return state
    .set('items', toImmutable([]))
    .set('error', null)
    .set('isLoading', true)
}

function receiveVendorsSuccess(state, {response}) {
  return state
    .set('items', toImmutable(response))
    .set('isLoading', false)
}

function receiveVendorsFailure(state, {error}) {
  console.log('Receiving list failed', error)
  return state
    .set('error', toImmutable(error))
    .set('isLoading', false)
}
