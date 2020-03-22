import { Store, toImmutable } from "nuclear-js"
import actionTypes from "../actionTypes"

function receiveMemberStart(state) {
  return state.set("data", null).set("error", null).set("isLoading", true)
}
function receiveMemberSuccess(state, { response }) {
  console.log("received stats" + state + response)
  return state.set("data", toImmutable(response)).set("isLoading", false)
}
function receiveMemberFailure(state, { error }) {
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
    this.on(actionTypes.RECEIVE_MEMBER_START, receiveMemberStart)
    this.on(actionTypes.RECEIVE_MEMBER_SUCCESS, receiveMemberSuccess)
    this.on(actionTypes.RECEIVE_MEMBER_FAILURE, receiveMemberFailure)
  },
})
