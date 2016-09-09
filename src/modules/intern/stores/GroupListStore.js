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
    this.on(actionTypes.RECEIVE_GROUPLIST_START, receiveGroupsStart)
    this.on(actionTypes.RECEIVE_GROUPLIST_SUCCESS, receiveGroupsSuccess)
    this.on(actionTypes.RECEIVE_GROUPLIST_FAILURE, receiveGroupsFailure)
  }
})

function receiveGroupsStart(state) {
  return state
    .set('data', null)
    .set('error', null)
    .set('isLoading', true)
}
function receiveGroupsSuccess(state, {response}) {
  console.log('received groups' + state + response)
  return state
    .set('data', toImmutable(response))
    .set('isLoading', false)
}
function receiveGroupsFailure(state, {error}) {
  console.log('receiving groups failed' + error.statusText)
  return state
    .set('error', toImmutable(error))
    .set('isLoading', false)
}
