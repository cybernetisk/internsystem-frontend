import reqwest from 'reqwest'
import {api} from '../../../api'

export function getSalesEstimates() {
  return reqwest({
    url: api('salgskalkyler'),
    type: 'json'
  })
}
