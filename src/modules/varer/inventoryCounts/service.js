import reqwest from '../../../utils/reqwest'
import {api} from '../../../api'

export const pageLimit = 30

export function getInventoryCounts(page) {
  return reqwest({
    url: api(`varer/varetellinger`),
    data: {limit: pageLimit, page},
    type: 'json'
  })
}

export function getInventoryCount(id, expanded = false) {
  let data = expanded ? {expand: true} : {}
  return reqwest({
    url: api(`varer/varetellinger/${id}`),
    data,
    type: 'json'
  })
}

export function getInventoryCountCounts(inventoryCountId) {
  return reqwest({
    url: api('varer/varetellingvarer'),
    data: {
      varetelling: inventoryCountId,
      expand: 1,
      ordering: '-time_added'
    },
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
