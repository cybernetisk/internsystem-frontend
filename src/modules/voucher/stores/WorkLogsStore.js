import { Store, toImmutable } from "nuclear-js"
import actionTypes from "../actionTypes"

function receiveWorkLogsStart(state) {
  return state.set("data", null).set("error", null).set("isLoading", true)
}

function receiveWorkLogsSuccess(state, { response }) {
  return state.set("data", toImmutable(response)).set("isLoading", false)
}

function receiveWorkLogsFailure(state, { error }) {
  console.log("Receiving work logs failed", error.statusText)
  return state.set("error", toImmutable(error)).set("isLoading", false)
}

function workLogUpdated(state, { worklog }) {
  return state.updateIn(["data", "results"], (res) =>
    res.map((elm) => {
      if (elm.get("id") == worklog.id) {
        return toImmutable(worklog)
      } else {
        return elm
      }
    }),
  )
}

function workLogDeleted(state, { id }) {
  return state.updateIn(["data", "results"], (res) =>
    res.filter((elm) => elm.get("id") != id),
  )
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
    this.on(actionTypes.RECEIVE_WORKLOGS_START, receiveWorkLogsStart)
    this.on(actionTypes.RECEIVE_WORKLOGS_SUCCESS, receiveWorkLogsSuccess)
    this.on(actionTypes.RECEIVE_WORKLOGS_FAILURE, receiveWorkLogsFailure)
    this.on(actionTypes.WORKLOG_UPDATED, workLogUpdated)
    this.on(actionTypes.WORKLOG_DELETED, workLogDeleted)
  },
})
