import {api} from '../../../api'
import angularModule from '../angularModule'

import {getResource} from '../AngularResource'

function createService() {
  const $resource = getResource()

  return $resource(api('kontoer/:id'), {
    id: '@id'
  }, {
    query: {
      // no pagination
      isArray: true
    }
  })
}

let instance;
export function getService() {
  if (!instance) {
    instance = createService()
  }
  return instance
}
