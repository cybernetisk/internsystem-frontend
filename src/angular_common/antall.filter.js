import angularModule from '../angularModule'
import {antall} from '../services/FormatService'

angularModule.filter('antall', function () {
  return antall
})
