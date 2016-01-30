import { Store, toImmutable } from 'nuclear-js'
import actionTypes from './../actionTypes'

export default Store({
  getInitialState() {
    return toImmutable({
      id: null,
      data: null,
      error: null,
      isLoading: true,
    })
  },

  initialize() {
    this.on(actionTypes.RECEIVE_INVENTORYCOUNT_START, receiveInventoryItemStart)
    this.on(actionTypes.RECEIVE_INVENTORYCOUNT_SUCCESS, receiveInventoryItemSuccess)
    this.on(actionTypes.RECEIVE_INVENTORYCOUNT_FAILURE, receiveInventoryItemFailure)
    this.on(actionTypes.VARE_ADDED, vareAdded)
  }
})

function receiveInventoryItemStart(state, {id}) {
  return state
    .set('id', id)
    .set('error', null)
    .set('isLoading', true)
}

function receiveInventoryItemSuccess(state, {response}) {
  return state
    .set('id', toImmutable(response.id))
    .set('data', toImmutable(response))
    .set('isLoading', false)
}

function receiveInventoryItemFailure(state, {error}) {
  console.log("Receiving inventory count failed", error)
  return state
    .set('error', toImmutable(error))
    .set('isLoading', false)
}

function vareAdded(state, {countId, vare}) {
  if (state.get('id') != countId) {
    return state
  }

  return state.updateIn(['data', 'varer'], varer => varer.push(toImmutable(vare)))
}
