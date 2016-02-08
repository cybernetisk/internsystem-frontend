import { Store, toImmutable } from 'nuclear-js'
import actionTypes from '../actionTypes'
import * as consts from '../../consts'

const initialFilters = {
  text: '',
  group: null,
  f: consts.inventoryCountOptionsDefault
}

export default Store({
  getInitialState() {
    return toImmutable(initialFilters)
  },

  initialize() {
    this.on(actionTypes.INVENTORYCOUNT_FILTERS, (state, filters) => {
      return state
        .merge(toImmutable(filters))
    })

    this.on(actionTypes.INVENTORYCOUNT_FILTERS_CLEAR, () => {
      return toImmutable(initialFilters)
    })
  }
})
