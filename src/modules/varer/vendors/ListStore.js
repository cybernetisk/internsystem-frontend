import { Store, toImmutable } from 'nuclear-js'
import {
  RECEIVE_VENDORS_START,
  RECEIVE_VENDORS_SUCCESS,
  RECEIVE_VENDORS_FAILURE
} from '../actionTypes'

export default Store({
  getInitialState() {
    return toImmutable({
      items: [],
      error: null,
      isLoading: true
    })
  },

  initialize() {
    this.on(RECEIVE_VENDORS_START, receiveVendorsStart)
    this.on(RECEIVE_VENDORS_SUCCESS, receiveVendorsSuccess)
    this.on(RECEIVE_VENDORS_FAILURE, receiveVendorsFailure)
  }
})

function receiveVendorsStart(state) {
  return state
    .set('items', toImmutable([]))
    .set('error', null)
    .set('isLoading', true)
}

function receiveVendorsSuccess(state, {items}) {
  return state
    .set('items', toImmutable(items))
    .set('isLoading', false)
}

function receiveVendorsFailure(state, err) {
  console.log("Receiving list failed", err)
  return state
    .set('error', toImmutable(err))
    .set('isLoading', false)
}
