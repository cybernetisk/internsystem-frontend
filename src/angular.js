require('./app.scss');

import AuthService from './modules/auth/services/AuthService'
import React from 'react'
import {Route} from 'react-router'

window.jQuery = window.$ = require('jquery');
window.angular = require('angular');
require('bootstrap-sass');
window.math = require('mathjs');

var module = angular.module('cyb.oko', [
  require('ui.router'),
  require('./modules/varer/'),
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

module.factory("AuthRequireResolver", function ($q) {
  return $q(function (resolve, reject) {
    AuthService.isLoggedIn().then(resolve, reject)
  })
})

require('./angular_common/antall.filter.js');
require('./angular_common/directives');
require('./angular_common/loader.directive.js');
require('./angular_common/pagination.directive.js');
require('./angular_common/ParamsHelper');
require('./angular_common/price.filter.js');

class AngularWrapper extends React.Component {
  componentDidMount() {
    angular.bootstrap(this.refs.angular.getDOMNode(), ['cyb.oko'])
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    return (
      <div ref='angular'>
        <div data-ui-view=''></div>
      </div>
    )
  }
}

export default (
  <Route>
    <Route name="angular.wrapper" path="/varer" handler={AngularWrapper}/>
    <Route path="/varer/**" handler={AngularWrapper}/>
  </Route>
)
