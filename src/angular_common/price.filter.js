import angularModule from '../angularModule'
import {price} from '../services/FormatService'

angularModule.filter('price', function () {
  return price
})
