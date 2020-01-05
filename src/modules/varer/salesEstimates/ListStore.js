import { Store, toImmutable } from "nuclear-js"
import actionTypes from "./actionTypes"

function receiveSalesEstimatesStart(state) {
  return state
    .set("items", toImmutable([]))
    .set("error", null)
    .set("isLoading", true)
}

function receiveSalesEstimatesSuccess(state, { response }) {
  return state.set("items", toImmutable(response)).set("isLoading", false)
}

function receiveSalesEstimatesFailure(state, { error }) {
  console.log("Receiving list failed", error)
  return state.set("error", toImmutable(error)).set("isLoading", false)
}

export default Store({
  getInitialState() {
    return toImmutable({
      items: [],
      error: null,
      isLoading: true,
    })
  },

  initialize() {
    this.on(
      actionTypes.RECEIVE_SALESESTIMATES_START,
      receiveSalesEstimatesStart,
    )
    this.on(
      actionTypes.RECEIVE_SALESESTIMATES_SUCCESS,
      receiveSalesEstimatesSuccess,
    )
    this.on(
      actionTypes.RECEIVE_SALESESTIMATES_FAILURE,
      receiveSalesEstimatesFailure,
    )
  },
})
