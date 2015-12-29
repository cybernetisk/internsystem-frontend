import reqwest from 'reqwest'
import {api} from '../../../api'

export const pageLimit = 500

export function getSalesProducts(page) {
  return reqwest({
    url: api(`salgsvarer`),
    data: {limit: pageLimit, page},
    type: 'json'
  })
}
