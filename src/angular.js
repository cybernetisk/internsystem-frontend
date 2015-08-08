require('./app.scss');

window.jQuery = window.$ = require('jquery');
window.React = require('react');
window.angular = require('angular');
require('bootstrap-sass');
window.math = require('mathjs');

var module = angular.module('cyb.oko', [
  require('ui.router'),
  require('./modules/varer/'),
  require('./modules/auth/'),
]);

module.config(function ($locationProvider, $urlRouterProvider, $httpProvider) {
  $locationProvider.html5Mode(true);

  $urlRouterProvider
    .otherwise(function () {
      console.log("unknown route");
    });

  $httpProvider.defaults.xsrfCookieName = 'csrftoken';
  $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
});

require('./angular_common/antall.filter.js');
require('./angular_common/directives');
require('./angular_common/loader.directive.js');
require('./angular_common/pagination.directive.js');
require('./angular_common/ParamsHelper');
require('./angular_common/price.filter.js');
