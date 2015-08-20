import angularModule from '../angularModule'

angularModule.config(function ($stateProvider) {
  $stateProvider.state('råvare.edit', {
    url: '/edit',
    templateUrl: require('./edit.html'),
    controller: 'RåvarerEditController as edit'
  })
})

angularModule.controller('RåvarerEditController', function ($scope, $stateParams) {
  console.log("RåvarerEditController", $stateParams)
  console.log("item:", $scope.item)
})
