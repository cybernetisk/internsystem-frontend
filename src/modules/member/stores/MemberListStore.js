import { Store, toImmutable } from "nuclear-js"
import actionTypes from "../actionTypes"

function receiveMembersStart(state) {
  return state.set("data", null).set("error", null).set("isLoading", true)
}
function receiveMembersSuccess(state, { response }) {
  console.log("received stats")
  return state.set("data", toImmutable(response)).set("isLoading", false)
}
function receiveMembersFailure(state, { error }) {
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
    this.on(actionTypes.RECEIVE_MEMBERLIST_START, receiveMembersStart)
    this.on(actionTypes.RECEIVE_MEMBERLIST_SUCCESS, receiveMembersSuccess)
    this.on(actionTypes.RECEIVE_MEMBERLIST_FAILURE, receiveMembersFailure)
  },
})
