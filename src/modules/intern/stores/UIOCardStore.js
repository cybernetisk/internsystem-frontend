import { Store, toImmutable} from 'nuclear-js'
import actionTypes from '../actionTypes'

export default Store({
  getInitialState(){
    return toImmutable({
      data: null,
      error: null,
      isLoading: true
    })
  },
  initialize(){
    this.on(actionTypes.RECEIVE_UIOCARD_START, receiveUIOCardsStart)
    this.on(actionTypes.RECEIVE_UIOCARD_SUCCESS, receiveUIOCardsSuccess)
    this.on(actionTypes.RECEIVE_UIOCARD_FAILURE, receiveUIOCardFailure)
  }
})

function receiveUIOCardsStart(state) {
  return state
    .set('data', null)
    .set('error', null)
    .set('isLoading', true)
}
function receiveUIOCardsSuccess(state, {response}) {
  console.log('received uio cards' + state + response)
  return state
    .set('data', toImmutable(response))
    .set('isLoading', false)
}
function receiveUIOCardFailure(state, {error}) {
  console.log('receiving UiOCard failed' + error.statusText)
  return state
    .set('error', toImmutable(error))
    .set('isLoading', false)
}
