import { Store, toImmutable } from "nuclear-js"
import actionTypes from "../actionTypes"

function receiveStatsStart(state) {
  return state
    .set("data", null)
    .set("error", null)
    .set("isLoading", null)
}

function receiveStatsSuccess(state, { response }) {
  console.log("received stats")
  return state.set("data", toImmutable(response)).set("isLoading", false)
}
function receiveStatsFailure(state, [error]) {
  console.log("receiveing stats failed", error.statusText)
  return state.set("error", toImmutable(error)).set("isLoading", false)
}

export default Store({
  getInitialState() {
    return toImmutable({
      data: null,
      error: null,
      isLoading: true,
    })
  },
  initialize() {
    this.on(actionTypes.RECEIVE_MEMBERSTATS_START, receiveStatsStart)
    this.on(actionTypes.RECEIVE_MEMBERSTATS_SUCCESS, receiveStatsSuccess)
    this.on(actionTypes.RECEIVE_MEMBERSTATS_FAILURE, receiveStatsFailure)
  },
})
