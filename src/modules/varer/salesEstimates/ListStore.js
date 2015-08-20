import { Store, toImmutable } from 'nuclear-js'
import {
  RECEIVE_SALESESTIMATES_START,
  RECEIVE_SALESESTIMATES_SUCCESS,
  RECEIVE_SALESESTIMATES_FAILURE
} from './actionTypes'

export default Store({
  getInitialState() {
    return toImmutable({
      items: [],
      error: null,
      isLoading: true
    })
  },

  initialize() {
    this.on(RECEIVE_SALESESTIMATES_START, receiveSalesEstimatesStart)
    this.on(RECEIVE_SALESESTIMATES_SUCCESS, receiveSalesEstimatesSuccess)
    this.on(RECEIVE_SALESESTIMATES_FAILURE, receiveSalesEstimatesFailure)
  }
})

function receiveSalesEstimatesStart(state) {
  return state
    .set('items', toImmutable([]))
    .set('error', null)
    .set('isLoading', true)
}

function receiveSalesEstimatesSuccess(state, {items}) {
  return state
    .set('items', toImmutable(items))
    .set('isLoading', false)
}

function receiveSalesEstimatesFailure(state, err) {
  console.log("Receiving list failed", err)
  return state
    .set('error', toImmutable(err))
    .set('isLoading', false)
}
