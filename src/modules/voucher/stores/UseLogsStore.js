import { Store, toImmutable } from "nuclear-js"
import actionTypes from "../actionTypes"

function receiveUseLogsStart(state) {
  return state.set("data", null).set("error", null).set("isLoading", true)
}

function receiveUseLogsSuccess(state, { response }) {
  return state.set("data", toImmutable(response)).set("isLoading", false)
}

function receiveUseLogsFailure(state, { error }) {
  console.log("Receiving use logs failed", error.statusText)
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
    this.on(actionTypes.RECEIVE_USELOGS_START, receiveUseLogsStart)
    this.on(actionTypes.RECEIVE_USELOGS_SUCCESS, receiveUseLogsSuccess)
    this.on(actionTypes.RECEIVE_USELOGS_FAILURE, receiveUseLogsFailure)
  },
})
