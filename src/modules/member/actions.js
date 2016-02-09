import reactor from './../../reactor'
import {dispatchAsync} from '../../utils/FluxUtils'

import MemberService from './services/MemberService'

import actionsType from './actionsType'

export function getMemberList(page) {
    dispatchAsync(MemberService.getMemberList(page, 50),{
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