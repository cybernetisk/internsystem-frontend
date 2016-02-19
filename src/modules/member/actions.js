import reactor from './../../reactor'
import {dispatchAsync} from '../../utils/FluxUtils'

import MemberService from './services/MemberService'

import actionTypes from './actionTypes'

export function getMemberList(page, limit, ordering, name) {
  dispatchAsync(MemberService.getMemberList(page, limit, ordering, name), {
    request: actionTypes.RECIVE_MEMBERLIST_START,
    success: actionTypes.RECIVE_MEMBERLIST_SUCCESS,
    failure: actionTypes.RECIVE_MEMBERLIST_FAILURE,
  }, {page, limit, ordering, name})
}

export function getMember(memberId) {
  dispatchAsync(MemberService.getMember(memberId), {
    request: actionTypes.RECIVE_MEMBER_START,
    success: actionTypes.RECIVE_MEMBER_SUCCESS,
    failure: actionTypes.RECIVE_MEMBER_FAILURE,
  })
}
export function memberDeleted(memberId) {
  reactor.dispatch(actionTypes.MEMBER_DELETED, {memberId})
}
export function updateMember(id) {
  reactor.dispatch(actionTypes.MEMBER_UPDATED, {id})
}
