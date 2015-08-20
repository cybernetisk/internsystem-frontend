import angularModule from '../angularModule'

angularModule.config(function ($stateProvider) {
  "ngInject"
  $stateProvider.state('råvare.edit', {
    url: '/edit',
    templateUrl: require('./edit.html'),
    controller: 'RåvarerEditController as edit'
  })
})

angularModule.controller('RåvarerEditController', function ($scope, $stateParams) {
  "ngInject"
  console.log("RåvarerEditController", $stateParams)
  console.log("item:", $scope.item)
})
