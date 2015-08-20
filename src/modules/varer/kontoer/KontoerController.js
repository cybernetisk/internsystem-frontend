import angularModule from '../angularModule'
import {getService as KontoerService} from './KontoerService'

angularModule.config(function ($stateProvider) {
  "ngInject"
  $stateProvider.state('kontoer', {
    url: '/varer/kontoer',
    templateUrl: require('./index.html'),
    controller: 'KontoerController as kontoer'
  })
})

angularModule.controller('KontoerController', function ($scope) {
  "ngInject"
  KontoerService().query(res => {
    this.items = res
    $scope.$apply()
  })
})
