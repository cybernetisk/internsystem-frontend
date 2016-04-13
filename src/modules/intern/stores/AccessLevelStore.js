import { Store, toImmutable} from 'nuclear-js'
import actionsType from '../actionTypes'

export default Store({
  getInitialState(){
    return toImmutable({
      data: null,
      error: null,
      isLoading: null
    })
  },
  initialize(){
    this.on(actionsType)
  }
})

function receiveAccessLevelsStart(state) {
  return state
    .set('data', null)
    .set('error', null)
    .set('isLoading', true)
}
function receiveAccessLevelsSuccess(state, {response}) {
  console.log('received accesslevels' + state + response)
  return state
    .set('data', toImmutable(response))
    .set('isLoading', false)
}
function receiveAccessLevelsFailure(state, {error}) {
  console.log('receiving accesslevels failed' + error.statusText)
  return state
    .set('error', toImmutable(error))
    .set('isLoading', false)
}
