import reactor from './../../reactor'
import {dispatchAsync} from '../../utils/FluxUtils'

import MemberService from './services/MemberService'

import actionsType from './actionsType'

export function getMemberList() {
    dispatchAsync(MemberService.getMemberList(),{
     request: actionsType.RECIVE_MEMBERLIST_START,
     success: actionsType.RECIVE_MEMBERLIST_SUCCESS,
     failure: actionsType.RECIVE_MEMBERLIST_FAILURE,
    })
}