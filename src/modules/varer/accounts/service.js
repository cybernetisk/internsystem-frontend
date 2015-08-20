import reqwest from 'reqwest'
import {api} from '../../../api'

export function getAccounts() {
  return reqwest({
    url: api('kontoer'),
    type: 'json'
  })
}
