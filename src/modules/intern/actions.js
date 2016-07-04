import reactor from './../../reactor'
import {dispatchAsync} from './../../utils/FluxUtils'

import InternService from './services/InternService'

import actionTypes from './actionTypes'

export function getInterns(page, limit, search){
  dispatchAsync(InternService.getInterns(page, limit, search), {
    request: actionTypes.RECEIVE_INTERNLIST_START,
    success: actionTypes.RECEIVE_INTERNLIST_SUCCESS,
    failure: actionTypes.RECEIVE_INTERNLIST_FAILURE
  }, {page, limit, search})
}
export function getGroups(page, limit){
  dispatchAsync(InternService.getGroupList(page, limit),{
    request: actionTypes.RECEIVE_GROUPLIST_START,
    success: actionTypes.RECEIVE_GROUPLIST_SUCCESS,
    failure: actionTypes.RECEIVE_GROUPLIST_FAILURE
  }, {page, limit})
}
export function getAccessLevels(){
  dispatchAsync(InternService.getAccessLevels(),{
    request: actionTypes.RECEIVE_ACCESS_LEVELS_START,
    success: actionTypes.RECEIVE_ACCESS_LEVELS_SUCCESS,
    failure: actionTypes.RECEIVE_ACCESS_LEVELS_FAILURE
  })
}
export function getIntern(internId){
  dispatchAsync(InternService.getIntern(internId),{
    request: actionTypes.RECEIVE_INTERN_START,
    success: actionTypes.RECEIVE_INTERN_SUCCESS,
    failure: actionTypes.RECEIVE_INTERN_FAILURE
  }), {internId}
}
export function getInternRoles(){
  dispatchAsync(InternService.getInternRoles(),{
    request: actionTypes.RECEIVE_INTERNROLES_START,
    success: actionTypes.RECEIVE_INTERNROLES_SUCCESS,
    failure: actionTypes.RECEIVE_INTERNROLES_FAILURE
  })
}
export function getGroup(groupId) {
  dispatchAsync(InternService.getGroup(groupId),{
    request: actionTypes.RECEIVE_GROUP_START,
    success: actionTypes.RECEIVE_GROUP_SUCCESS,
    failure: actionTypes.RECEIVE_GROUP_FAILURE
  })
}
export function getRolesInGroup(groupId) {
  dispatchAsync(InternService.getRolesInGroup(groupId),{
    request: actionTypes.RECEIVE_ROLES_START,
    success: actionTypes.RECEIVE_ROLES_SUCCESS,
    failure: actionTypes.RECEIVE_ROLES_FAILURE
  }), {groupId}

}
export function getInternInRoles(roleId) {

}
export function getInternsInGroup(groupId) {
  dispatchAsync(InternService.getInternsInGroup(groupId), {
    request: actionTypes.RECEIVE_INTERNROLES_START,
    success: actionTypes.RECEIVE_INTERNROLES_SUCCESS,
    failure: actionTypes.RECEIVE_INTERNROLES_FAILURE
  }), {groupId}
}
