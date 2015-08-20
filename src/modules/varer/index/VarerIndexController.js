import angularModule from '../angularModule'

angularModule.config(function ($stateProvider) {
  $stateProvider.state('varer', {
    url: '/varer',
    templateUrl: require('./index.html')
  })
})
