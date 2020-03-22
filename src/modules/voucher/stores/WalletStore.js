import { Store, toImmutable } from "nuclear-js"
import actionTypes from "../actionTypes"

function receiveWalletsStart(state) {
  return state.set("data", null).set("error", null).set("isLoading", true)
}

function receiveWalletsSuccess(state, { response }) {
  return state.set("data", toImmutable(response)).set("isLoading", false)
}

function receiveWalletsFailure(state, { error }) {
  console.log("Receiving wallets failed", error.statusText)
  return state.set("error", toImmutable(error)).set("isLoading", false)
}

export default Store({
  getInitialState() {
    return toImmutable({
      semester: null,
      data: null,
      error: null,
      isLoading: true,
    })
  },

  initialize() {
    this.on(actionTypes.SET_ACTIVE_SEMESTER, (state, { semester }) => {
      return state.set("semester", semester)
    })
    this.on(actionTypes.RECEIVE_WALLETS_START, receiveWalletsStart)
    this.on(actionTypes.RECEIVE_WALLETS_SUCCESS, receiveWalletsSuccess)
    this.on(actionTypes.RECEIVE_WALLETS_FAILURE, receiveWalletsFailure)
  },
})
