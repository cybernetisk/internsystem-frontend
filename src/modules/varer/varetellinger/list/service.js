import reqwest from 'reqwest'
import {api} from '../../../../api'

export const pageLimit = 30

export function getInventoryCounts(page) {
  return reqwest({
    url: api(`varer/varetellinger`),
    data: {limit: pageLimit, page},
    type: 'json'
  })
}
