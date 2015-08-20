import angularModule from '../../angularModule'
import VaretellingerItemController from './VaretellingerItemController'

import './VaretellingerItemListView' // used by List.js

angularModule
  .config(function ($stateProvider) {
    $stateProvider.state('varetelling', {
      url: '/varer/varetellinger/:id',
      templateUrl: require('./item.html'),
      controller: 'VaretellingerItemController as ctrl'
    })
  })
  .controller('VaretellingerItemController', VaretellingerItemController)
