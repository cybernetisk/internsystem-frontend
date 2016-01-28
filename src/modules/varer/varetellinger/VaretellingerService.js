import angularModule from '../angularModule'

import {api} from '../../../api'
import {getResource} from '../AngularResource'

function createService() {
  const $resource = getResource()

  let VaretellingerService = $resource(api('varer/varetellinger/:id'), {
    id: '@id'
  }, {
    query: {
      isArray: false,
      params: {
        limit: 30
      }
    }
  })

  VaretellingerService.makeSummer = function (parent) {
    this.count = 0
    this.sum = 0
    this.pant = 0
    this.parent = parent
    this.add = function (count, sum, pant) {
      this.count += count
      this.sum += Math.round(sum * 100) / 100
      this.pant += Math.round(pant * 100) / 100
      if (this.parent) this.parent.add(count, sum, pant)
    }
    this.new = function () {
      return new VaretellingerService.makeSummer(this)
    }
  }

  return VaretellingerService
}

let instance
export function getService() {
  if (!instance) {
    instance = createService()
  }
  return instance
}