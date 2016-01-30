import { Store, toImmutable } from 'nuclear-js'
import actionTypes from './../actionTypes'
import * as consts from '../../consts'

const initialFilters = {
  text: '',
  group: null,
  f: consts.outdatedOptionsDefault
}

export default Store({
  getInitialState() {
    return toImmutable(initialFilters)
  },

  initialize() {
    this.on(actionTypes.INVENTORYCOUNT_FILTERS, updateFilters)
    this.on(actionTypes.INVENTORYCOUNT_FILTERS_CLEAR, clearFilters)
  }
})

function updateFilters(state, filters) {
  return state
    .merge(toImmutable(filters))
}

function clearFilters(state) {
  return toImmutable(initialFilters)
}
