import { Store, toImmutable } from "nuclear-js"
import actionTypes from "../actionTypes"

export default Store({
  getInitialState() {
    return toImmutable({
      id: null,
      data: null,
      error: null,
      isLoading: true,
    })
  },

  initialize() {
    this.on(actionTypes.RECEIVE_INVENTORYCOUNT_START, (state, { id }) => {
      return state.set("id", id).set("error", null).set("isLoading", true)
    })

    this.on(
      actionTypes.RECEIVE_INVENTORYCOUNT_SUCCESS,
      (state, { response }) => {
        return state
          .set("id", toImmutable(response.id))
          .set("data", toImmutable(response))
          .set("isLoading", false)
      },
    )

    this.on(actionTypes.RECEIVE_INVENTORYCOUNT_FAILURE, (state, { error }) => {
      console.log("Receiving inventory count failed", error)
      return state.set("error", toImmutable(error)).set("isLoading", false)
    })

    this.on(actionTypes.VARE_ADDED, (state, { countId, vare }) => {
      if (state.get("id") != countId || !state.getIn(["data", "varer"])) {
        return state
      }

      vare = toImmutable(vare).set("raavare", vare.raavare.id)
      return state.updateIn(["data", "varer"], (varer) => varer.push(vare))
    })
  },
})
