import '../../../angular_common/ParamsHelper'

import angularModule from '../angularModule'
import {getService as SalgskalkylerService} from './SalgskalkylerService'

angularModule.config(function ($stateProvider) {
  $stateProvider.state('salgskalkyler', {
    url: '/varer/salgskalkyler',
    templateUrl: require('./index.html'),
    controller: 'SalgskalkylerController as salgskalkyler'
  })
})

angularModule.controller('SalgskalkylerController', function ($scope, ParamsHelper) {
  var self = this

  var helper = ParamsHelper.track($scope,
    ['page'],
    {'salgskalkyler.pagination.page': 'page'},
    function (params) {
      self.items = null

      SalgskalkylerService().query(params, function (res) {
        self.items = res.results
        self.pagination = res.pagination
        $scope.$apply()
      })
    }
  )

  helper.run()
})
