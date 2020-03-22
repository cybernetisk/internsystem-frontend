import { Store, toImmutable } from "nuclear-js"
import actionTypes from "../actionTypes"

function receiveGroupStart(state) {
  return state.set("data", null).set("error", null).set("isLoading", true)
}
function receiveGroupSuccess(state, { response }) {
  console.log("received group" + state + response)
  return state.set("data", toImmutable(response)).set("isLoading", false)
}
function receiveGroupFailure(state, { error }) {
  console.log("receiving group failed" + error.statusText)
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
    this.on(actionTypes.RECEIVE_GROUP_START, receiveGroupStart)
    this.on(actionTypes.RECEIVE_GROUP_SUCCESS, receiveGroupSuccess)
    this.on(actionTypes.RECEIVE_GROUP_FAILURE, receiveGroupFailure)
  },
})
