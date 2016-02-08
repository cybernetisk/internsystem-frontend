import reqwest from '../../../utils/reqwest'
import {api} from '../../../api'

export function getSalesEstimates() {
  return reqwest({
    url: api('varer/salgskalkyler'),
    type: 'json'
  })
}
