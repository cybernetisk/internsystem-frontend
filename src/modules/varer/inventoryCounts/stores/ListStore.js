import { Store, toImmutable } from 'nuclear-js'
import actionTypes from '../actionTypes'

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
    this.on(actionTypes.RECEIVE_INVENTORYCOUNTS_START, (state, {page}) => {
      return state
        .set('activePage', page)
        .set('items', toImmutable([]))
        .set('error', null)
        .set('isLoading', true)
    })

    this.on(actionTypes.RECEIVE_INVENTORYCOUNTS_SUCCESS, (state, {response}) => {
      return state
        .set('count', toImmutable(response.count))
        .set('items', toImmutable(response.results))
        .set('isLoading', false)
    })

    this.on(actionTypes.RECEIVE_INVENTORYCOUNTS_FAILURE, (state, {error}) => {
      console.log("Receiving list failed", error)
      return state
        .set('error', toImmutable(error))
        .set('isLoading', false)
    })
  }
})
