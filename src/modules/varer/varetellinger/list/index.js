import angularModule from '../../angularModule'
import VaretellingerController from './VaretellingerController'

angularModule
  .config(function ($stateProvider) {
    $stateProvider.state('varetellinger', {
      url: '/varer/varetellinger',
      templateUrl: require('./index.html'),
      controller: 'VaretellingerController as varetellinger'
    })
  })
  .controller('VaretellingerController', VaretellingerController)
