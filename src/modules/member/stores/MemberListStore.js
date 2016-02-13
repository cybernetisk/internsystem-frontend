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
        this.on(actionTypes.RECIVE_MEMBERLIST_START, reciveMembersStart)
        this.on(actionTypes.RECIVE_MEMBERLIST_SUCCESS, reciveMembersSuccess)
        this.on(actionTypes.RECIVE_MEMBERLIST_FAILURE, reciveMembersFailure)
    }
})

function reciveMembersStart(state) {
    return state
        .set('data', null)
        .set('error', null)
        .set('isLoading', true)
}
function reciveMembersSuccess(state, {response}) {
    console.log("Recived stats")
    return state
        .set('data', toImmutable(response))
        .set('isLoading', false)
}
function reciveMembersFailure(state, {error}) {
    console.log("Reciveing stats failed", error.statusText)
    return state
        .set('error', toImmutable(error))
        .set('isLoading', false)
}