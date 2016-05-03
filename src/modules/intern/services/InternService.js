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
}
export default new InternService()
