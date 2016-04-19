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
  })
}
