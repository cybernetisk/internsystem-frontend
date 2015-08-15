import {price} from '../services/FormatService'

angular.module('cyb.oko').filter('price', function () {
  return price
})
