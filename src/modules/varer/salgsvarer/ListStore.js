import { Store, toImmutable } from 'nuclear-js'
import actionTypes from './actionTypes'
import * as consts from './consts'

const initialFilters = {
  text: '',
  group: null,
  outdated: consts.outdatedOptionsDefault
}

export default Store({
  getInitialState() {
    return toImmutable({
      activePage: 1,
      count: 0,
      error: null,
      filters: initialFilters,
      items: [],
      isLoading: true
    })
  },

  initialize() {
    this.on(actionTypes.SALESPRODUCTS_FILTERS, updateFilters)
    this.on(actionTypes.SALESPRODUCTS_FILTERS_CLEAR, clearFilters)
    this.on(actionTypes.RECEIVE_SALESPRODUCTS_START, receiveSalesProductsStart)
    this.on(actionTypes.RECEIVE_SALESPRODUCTS_SUCCESS, receiveSalesProductsSuccess)
    this.on(actionTypes.RECEIVE_SALESPRODUCTS_FAILURE, receiveSalesProductsFailure)
  }
})

function updateFilters(state, filters) {
  return state
    .set('filters', state.get('filters').merge(toImmutable(filters)))
}

function clearFilters(state) {
  return state
    .set('filters', toImmutable(initialFilters))
}

function receiveSalesProductsStart(state, {page}) {
  return state
    .set('activePage', page)
    .set('items', toImmutable([]))
    .set('error', null)
    .set('isLoading', true)
}

function receiveSalesProductsSuccess(state, {response}) {
  return state
    .set('count', toImmutable(response.count))
    .set('items', toImmutable(response.results))
    .set('isLoading', false)
}

function receiveSalesProductsFailure(state, {error}) {
  console.log("Receiving list failed", error)
  return state
    .set('error', toImmutable(error))
    .set('isLoading', false)
}
