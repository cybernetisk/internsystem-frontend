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
    this.on(actionsType.RECEIVE_INTERNLIST_START, receiveInternsStart)
    this.on(actionsType.RECEIVE_INTERNLIST_SUCCESS, receiveInternsSuccess)
    this.on(actionsType.RECEIVE_INTERNLIST_FAILURE, receiveInternsFailure)
  }
})

function receiveInternsStart(state) {
  return state
    .set('data', null)
    .set('error', null)
    .set('isLoading', true)
}
function receiveInternsSuccess(state, {response}) {
  console.log('received interns' + state + response)
  return state
    .set('data', toImmutable(response))
    .set('isLoading', false)
}
function receiveInternsFailure(state, {error}) {
  console.log('receiving interns failed' + error.statusText)
  return state
    .set('error', toImmutable(error))
    .set('isLoading', false)
}
