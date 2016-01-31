import reactor from '../../../../reactor'
import { Store, toImmutable } from 'nuclear-js'
import actionTypes from '../actionTypes'

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
    this.on(actionTypes.RECEIVE_INVENTORYCOUNTCOUNTS_START, (state, {inventoryCountId}) => {
      return state
        .set('id', toImmutable(inventoryCountId))
        .set('error', null)
        .set('isLoading', true)
    })

    this.on(actionTypes.RECEIVE_INVENTORYCOUNTCOUNTS_SUCCESS, (state, {response, inventoryCountId}) => {
      if (state.get('id') != inventoryCountId) {
        return state
      }

      return state
        .set('id', toImmutable(inventoryCountId))
        .set('data', toImmutable(response))
        .set('isLoading', false)
    })

    this.on(actionTypes.RECEIVE_INVENTORYCOUNTCOUNTS_FAILURE, (state, {error}) => {
      console.log("Receiving inventory count counts failed", error)
      return state
        .set('error', toImmutable(error))
        .set('isLoading', false)
    })

    this.on(actionTypes.VARE_ADDED, (state, {countId, vare}) => {
      if (state.get('id') != countId) {
        return state
      }

      return state.updateIn(['data'], data => data.unshift(toImmutable(vare)))
    })
  }
})
