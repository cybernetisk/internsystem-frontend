import deferredGetter from './utils/deferredGetter'
import {csrfToken} from './modules/auth/getters'

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

    $httpProvider.interceptors.push(function () {
      return {
        request: function(config) {
          // make sure the request contains the CSRF-token
          // which is acquired by the /api/me-request
          return new Promise((resolve, reject) => {
            deferredGetter(csrfToken).then(csrfToken => {
              if (csrfToken) {
                config.headers['X-CSRFToken'] = csrfToken
              }

              resolve(config)
            })
          })
        }
      }
    })
  })

  .factory("AuthRequireResolver", function ($q) {
    return $q(function (resolve, reject) {
      AuthService.isLoggedIn().then(resolve, reject)
    })
  })
