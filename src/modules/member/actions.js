import reactor from './../../reactor'
import {dispatchAsync} from '../../utils/FluxUtils'

import MemberService from './services/MemberService'

import actionsType from './actionsType'

export function getMemberList(page, limit, ordering, name) {
    dispatchAsync(MemberService.getMemberList(page, limit, ordering, name),{
     request: actionsType.RECIVE_MEMBERLIST_START,
     success: actionsType.RECIVE_MEMBERLIST_SUCCESS,
     failure: actionsType.RECIVE_MEMBERLIST_FAILURE,
    }, {page, limit, ordering, name})
}

export function getMember(memberId){
    dispatchAsync(MemberService.getMember(memberId),{
        request: actionsType.RECIVE_MEMBER_START,
        success: actionsType.RECIVE_MEMBER_SUCCESS,
        failure: actionsType.RECIVE_MEMBER_FAILURE,
    }, {memberId})
}
export function memberDeleted(memberId){
    reactor.dispatch(actionsType.MEMBER_DELETED, {memberId})
}
export function updateMember(id){
    reactor.dispatch(actionsType.MEMBER_UPDATED, {id})
}
