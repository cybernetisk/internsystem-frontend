import reactor from '../../../../reactor'
import { Store, toImmutable } from 'nuclear-js'
import actionTypes from '../actionTypes'

export default Store({
  getInitialState() {
    return toImmutable({
      data: null,
      error: null,
      isLoading: true,
    })
  },

  initialize() {
    this.on(actionTypes.RECEIVE_INVENTORYCOUNTCOUNTS_START, (state, {id}) => {
      return state
        .set('id', id)
        .set('error', null)
        .set('isLoading', true)
    })

    this.on(actionTypes.RECEIVE_INVENTORYCOUNTCOUNTS_SUCCESS, (state, {response}) => {
      return state
        .set('id', toImmutable(response.id))
        .set('data', toImmutable(response))
        .set('isLoading', false)
    })

    this.on(actionTypes.RECEIVE_INVENTORYCOUNTCOUNTS_FAILURE, (state, {error}) => {
      console.log("Receiving inventory count counts failed", error)
      return state
        .set('error', toImmutable(error))
        .set('isLoading', false)
    })
  }
})
