import angularModule from '../angularModule'
import {getService as LeverandørerService} from './LeverandørerService'

angularModule.config(function ($stateProvider) {
  $stateProvider.state('leverandører', {
    url: '/varer/leverandører',
    templateUrl: require('./index.html'),
    controller: 'LeverandørerController as leverandorer'
  })
})

angularModule.controller('LeverandørerController', function ($scope) {
  var self = this
  LeverandørerService().query(function (res) {
    self.items = res
    $scope.$apply()
  })
})
