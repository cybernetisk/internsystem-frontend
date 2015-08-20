import angular from 'angular'
import {api} from '../../../api'

import {getResource} from '../AngularResource'

function createService() {
  const $resource = getResource()

  return $resource(api('leverandører/:id'), {
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
