import reqwest from '../../../utils/reqwestWithCsrf'
import {api} from '../../../api'

export const pageLimit = 30

export function getInventoryCounts(page) {
  return reqwest({
    url: api(`varer/varetellinger`),
    data: {limit: pageLimit, page},
    type: 'json'
  })
}

export function getInventoryCount(id) {
  return reqwest({
    url: api(`varer/varetellinger/${id}`),
    type: 'json'
  })
}

export function addVare(data) {
  return reqwest({
    url: api(`varer/varetellingvarer`),
    method: 'post',
    data,
    type: 'json'
  })
}
