import { Store, toImmutable } from "nuclear-js"
import * as consts from "../consts"
import actionTypes from "./actionTypes"

const initialFilters = {
  text: "",
  group: null,
  outdated: consts.outdatedOptionsDefault,
}

function updateFilters(state, filters) {
  return state.set("filters", state.get("filters").merge(toImmutable(filters)))
}

function clearFilters(state) {
  return state.set("filters", toImmutable(initialFilters))
}

function receiveInventoryItemsStart(state) {
  return state
    .set("items", toImmutable([]))
    .set("error", null)
    .set("isLoading", true)
}

function receiveInventoryItemsSuccess(state, { response }) {
  return state
    .set("count", toImmutable(response.length))
    .set("items", toImmutable(response))
    .set("isLoading", false)
}

function receiveInventoryItemsFailure(state, { error }) {
  console.log("Receiving list failed", error)
  return state.set("error", toImmutable(error)).set("isLoading", false)
}

export default Store({
  getInitialState() {
    return toImmutable({
      count: 0,
      error: null,
      filters: initialFilters,
      items: [],
      isLoading: true,
    })
  },

  initialize() {
    this.on(actionTypes.INVENTORYITEMS_FILTERS, updateFilters)
    this.on(actionTypes.INVENTORYITEMS_FILTERS_CLEAR, clearFilters)
    this.on(
      actionTypes.RECEIVE_INVENTORYITEMS_START,
      receiveInventoryItemsStart,
    )
    this.on(
      actionTypes.RECEIVE_INVENTORYITEMS_SUCCESS,
      receiveInventoryItemsSuccess,
    )
    this.on(
      actionTypes.RECEIVE_INVENTORYITEMS_FAILURE,
      receiveInventoryItemsFailure,
    )
  },
})
