import angularModule from '../../angularModule'
import {api} from '../../../../api'
import {getResource} from '../../AngularResource'

function createService() {
  const $resource = getResource()

  return $resource(api('varetellingvarer/:id'), {
    id: '@id'
  }, {
    query: {
      isArray: false,
      params: {
        limit: 30
      }
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
