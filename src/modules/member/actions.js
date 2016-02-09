import reactor from './../../reactor'
import {dispatchAsync} from '../../utils/FluxUtils'

import MemberService from './services/MemberService'

import actionsType from './actionsType'

export function getMemberList(page, limit, ordering) {
    dispatchAsync(MemberService.getMemberList(page, limit, ordering),{
     request: actionsType.RECIVE_MEMBERLIST_START,
     success: actionsType.RECIVE_MEMBERLIST_SUCCESS,
     failure: actionsType.RECIVE_MEMBERLIST_FAILURE,
    })
}

export function getMember(memberId){
    dispatchAsync(MemberService.getMember(memberId)),{
        request: actionsType.RECIVE_MEMBER_START,
        success: actionsType.RECIVE_MEMBER_SUCCESS,
        failure: actionsType.RECIVE_MEMBER_FAILURE,
    }
}

export function getNewMembers(page){
    dispatchAsync(MemberService.getNewMembers(page, 50, '-date_joined')), {
        request: actionsType.RECIVE_MEMBERLIST_START,
        success: actionsType.RECIVE_MEMBERLIST_SUCCESS,
        failure: actionsType.RECIVE_MEMBERLIST_FAILURE,
    }
}