import angularModule from '../angularModule'

import {getService as RåvarerService} from './RåvarerService'

angularModule.config(function ($stateProvider) {
  $stateProvider.state('råvare', {
    url: '/varer/råvarer/:id',
    templateUrl: require('./item.html'),
    controller: 'RåvarerItemController as item'
  })
})

angularModule.controller('RåvarerItemController', function ($scope, $stateParams, $window) {
  $window.location.href = '/admin/varer/råvare/' + parseInt($stateParams['id']) + '/'
  return

  console.log("RåvarerItemController", $stateParams)

  RåvarerService().get({id: $stateParams['id']}, res => {
    console.log(res)
    this.data = res
    $scope.$apply()
  })
})
