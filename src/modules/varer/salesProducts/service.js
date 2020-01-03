import reqwest from '../../../utils/reqwest'
import {api} from '../../../api'

export function getSalesProducts() {
  return reqwest({
    url: api('varer/salgsvarer'),
    type: 'json'
  })
}
