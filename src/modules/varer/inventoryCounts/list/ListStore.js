import { Store, toImmutable } from 'nuclear-js'
import actionTypes from './../actionTypes'

export default Store({
  getInitialState() {
    return toImmutable({
      activePage: 1,
      count: 0,
      error: null,
      items: [],
      isLoading: true
    })
  },

  initialize() {
    this.on(actionTypes.RECEIVE_INVENTORYCOUNTS_START, receiveInventoryItemsStart)
    this.on(actionTypes.RECEIVE_INVENTORYCOUNTS_SUCCESS, receiveInventoryItemsSuccess)
    this.on(actionTypes.RECEIVE_INVENTORYCOUNTS_FAILURE, receiveInventoryItemsFailure)
  }
})

function receiveInventoryItemsStart(state, {page}) {
  return state
    .set('activePage', page)
    .set('items', toImmutable([]))
    .set('error', null)
    .set('isLoading', true)
}

function receiveInventoryItemsSuccess(state, {response}) {
  return state
    .set('count', toImmutable(response.count))
    .set('items', toImmutable(response.results))
    .set('isLoading', false)
}

function receiveInventoryItemsFailure(state, {error}) {
  console.log("Receiving list failed", error)
  return state
    .set('error', toImmutable(error))
    .set('isLoading', false)
}
