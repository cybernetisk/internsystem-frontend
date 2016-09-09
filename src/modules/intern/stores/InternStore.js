import { Store, toImmutable} from 'nuclear-js'
import actionsType from '../actionTypes'

export default Store({
  getInitialState(){
    return toImmutable({
      data: null,
      error: null,
      isLoading: true
    })
  },
  initialize(){
    this.on(actionsType.RECEIVE_INTERN_START, receiveInternStart)
    this.on(actionsType.RECEIVE_INTERN_SUCCESS, receiveInternSuccess)
    this.on(actionsType.RECEIVE_INTERN_FAILURE, receiveInternFailure)
  }
})

function receiveInternStart(state) {
  return state
    .set('data', null)
    .set('error', null)
    .set('isLoading', true)
}
function receiveInternSuccess(state, {response}) {
  console.log('received intern' + state + response)
  return state
    .set('data', toImmutable(response))
    .set('isLoading', false)
}
function receiveInternFailure(state, {error}) {
  console.log('receiving intern failed' + error.statusText)
  return state
    .set('error', toImmutable(error))
    .set('isLoading', false)
}
