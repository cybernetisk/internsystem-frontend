import { Store, toImmutable } from "nuclear-js"
import actionsType from "../actionTypes"

function receiveRolesStart(state) {
  return state.set("data", null).set("error", null).set("isLoading", true)
}
function receiveRolesSuccess(state, { response }) {
  console.log("received roles" + state + response)
  return state.set("data", toImmutable(response)).set("isLoading", false)
}
function receiveRolesFailure(state, { error }) {
  console.log("receiving roles failed" + error.statusText)
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
    this.on(actionsType.RECEIVE_ROLES_START, receiveRolesStart)
    this.on(actionsType.RECEIVE_ROLES_SUCCESS, receiveRolesSuccess)
    this.on(actionsType.RECEIVE_ROLES_FAILURE, receiveRolesFailure)
  },
})
