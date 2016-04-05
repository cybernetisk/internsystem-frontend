import {api} from '../../../api'
import reqwest from '../../../utils/reqwest'

class InternService {
  getGroup(groupId){
    return reqwest({
      url: api('intern/groups' + groupId),
      type: 'json'
    })
  }
  getGroupList(page = 1, limit = 50){
    return reqwest({
      url: api('intern/groups'),
      type: 'json',
      data: {
        page,
        limit
      }
    })
  }
}
