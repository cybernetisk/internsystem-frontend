import reactor from './../../reactor'
import {dispatchAsync} from '../../utils/FluxUtils'

import MemberService from './services/MemberService'

import actionTypes from './actionTypes'

export function getMemberList(page, limit, ordering, name) {
  dispatchAsync(MemberService.getMemberList(page, limit, ordering, name), {
    request: actionTypes.RECEIVE_MEMBERLIST_START,
    success: actionTypes.RECEIVE_MEMBERLIST_SUCCESS,
    failure: actionTypes.RECEIVE_MEMBERLIST_FAILURE,
  }, {page, limit, ordering, name})
}

export function getMember(memberId) {
  dispatchAsync(MemberService.getMember(memberId), {
    request: actionTypes.RECEIVE_MEMBER_START,
    success: actionTypes.RECEIVE_MEMBER_SUCCESS,
    failure: actionTypes.RECEIVE_MEMBER_FAILURE,
  })
}
export function memberDeleted(memberId) {
  reactor.dispatch(actionTypes.MEMBER_DELETED, {memberId})
}
export function updateMember(id) {
  reactor.dispatch(actionTypes.MEMBER_UPDATED, {id})
}
export function getStats() {
  dispatchAsync(MemberService.getStats(), {
    request: actionTypes.RECEIVE_MEMBERSTATS_START,
    success: actionTypes.RECEIVE_MEMBERSTATS_SUCCESS,
    failure: actionTypes.RECEIVE_MEMBERSTATS_FAILURE
  })
}
