import reqwest from '../../../utils/reqwest'
import {api} from '../../../api'

export function getVendors() {
  return reqwest({
    url: api('varer/leverandører'),
    type: 'json'
  })
}
