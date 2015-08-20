export default angular.module('cyb.oko', [
  require('ui.router'),
  'cyb.varer',
])

  .config(function ($locationProvider, $urlRouterProvider, $httpProvider) {
    $locationProvider.html5Mode(true)

    $urlRouterProvider
      .otherwise(function () {
        console.log("unknown route")
      })

    $httpProvider.defaults.xsrfCookieName = 'csrftoken'
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken'
  })

  .factory("AuthRequireResolver", function ($q) {
    return $q(function (resolve, reject) {
      AuthService.isLoggedIn().then(resolve, reject)
    })
  })
