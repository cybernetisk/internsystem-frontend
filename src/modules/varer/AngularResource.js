import './angularModule'

export function getResource() {
  return angular.injector(['cyb.oko', require('angular-resource')]).get('$resource')
}
