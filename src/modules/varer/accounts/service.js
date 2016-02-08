import reqwest from '../../../utils/reqwest'
import {api} from '../../../api'

export function getAccounts() {
  return reqwest({
    url: api('varer/kontoer'),
    type: 'json'
  })
}
