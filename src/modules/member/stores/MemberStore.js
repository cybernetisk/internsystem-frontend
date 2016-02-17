import { Store, toImmutable } from 'nuclear-js'
import actionTypes from '../actionsType'

export default Store({
    getInitialState() {
        return toImmutable({
            data: null,
            error: null,
            isLoading: true
        })
    },

    initialize() {
        this.on(actionTypes.RECIVE_MEMBER_START, reciveMemberStart)
        this.on(actionTypes.RECIVE_MEMBER_SUCCESS, reciveMemberSuccess)
        this.on(actionTypes.RECIVE_MEMBER_FAILURE, reciveMemberFailure)
    }
})

function reciveMemberStart(state) {
    return state
        .set('data', null)
        .set('error', null)
        .set('isLoading', true)
}
function reciveMemberSuccess(state, {response}) {
    console.log("Recived stats" + state + response)
    return state
        .set('data', toImmutable(response))
        .set('isLoading', false)
}
function reciveMemberFailure(state, {error}) {
    console.log("Reciveing stats failed", error.statusText)
    return state
        .set('error', toImmutable(error))
        .set('isLoading', false)
}
