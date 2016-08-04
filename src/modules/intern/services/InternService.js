import {api} from '../../../api'
import reqwest from '../../../utils/reqwest'

class InternService {
  getGroup(groupId) {
    return reqwest({
      url: api('intern/groups/' + groupId),
      type: 'json'
    })
  }

  getGroupList(page = 1, limit = 50) {
    return reqwest({
      url: api('intern/groups'),
      type: 'json',
      data: {
        page,
        limit
      }
    })
  }

  getUsers(search) {
    return reqwest({
      url: api('core/users'),
      data: {
        search,
        limit: 20
      },
      type: 'json'
    })
  }

  getIntern(internId){
    return reqwest({
      url: api('intern/interns/' + internId),
      type: 'json'
    })
  }

  getInterns(page = 1, limit = 50, search = '') {
    return reqwest({
      url: api('intern/interns'),
      type: 'json',
      data: {
        page,
        limit,
        search
      }
    })
  }

  getAccessLevels() {
    return reqwest({
      url: api('intern/accesslevels'),
      type: 'json',
    })
  }

  getRoles(){
    return reqwest({
      url: api('intern/roles'),
      type: 'json'
    })
  }

  getRole(roleId){
    return reqwest({
      url: api('intern/roles/' + roleId),
      type: 'json'
    })
  }

  getInternsFromRole(roleId){
    return reqwest({
      url: api('intern/interns'),
      type: 'json',
      data: {
        roles: roleId
      }
    })
  }

  getRolesInGroup(groupId){
    return reqwest({
      url: api('intern/roles'),
      type:'json',
      data: {
        groups: groupId
      }
    })
  }

  getInternsInGroup(groupId){
    return reqwest({
      url: api('intern/internroles'),
      type: 'json',
      data: {
        role__groups: groupId
      }
    })
  }

  getInternRoleForIntern(internId){
    return reqwest({
      url: api('intern/internroles'),
      type: 'json',
      data: {
        intern: internId
      }
    })
  }

  addRoleToIntern(username, roleId){
    return reqwest({
      url: api('intern/internroles'),
      type: 'json',
      method: 'post',
      data: {
        username: username,
        role: roleId
      }
    })
  }



}
export default new InternService()
