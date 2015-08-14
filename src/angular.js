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

let angularHasBootstrapped = false

function createAngularRootElement() {
  let root = document.createElement('div')

  let subElm = document.createElement('div')
  subElm.setAttribute('data-ui-view', '')
  root.appendChild(subElm)

  return root
}

let angularRootElement = createAngularRootElement();

class AngularWrapper extends React.Component {
  componentDidMount() {
    let firstRun = !angularHasBootstrapped
    if (firstRun) {
      angular.bootstrap(angularRootElement, ['cyb.oko'])
      angularHasBootstrapped = true
    }

    React.findDOMNode(this.refs.angular).appendChild(angularRootElement)

    if (!firstRun) {
      // force update of new location
      $(window).triggerHandler('popstate')
    }
  }

  componentWillReceiveProps() {
    // props should only change on url change, so trigger popstate to notify angular of new location
    $(window).triggerHandler('popstate')
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    return (
      <div ref='angular'></div>
    )
  }
}

export default (
  <Route>
    <Route name="angular.wrapper" path="/varer" handler={AngularWrapper}/>
    <Route path="/varer/**" handler={AngularWrapper}/>
    <Route name='varer' path='/varer' handler={AngularWrapper}/>
    <Route name='varer/råvarer' path='/varer/råvarer' handler={AngularWrapper}/>
    <Route name='varer/salgsvarer' path='/varer/salgsvarer' handler={AngularWrapper}/>
    <Route name='varer/kontoer' path='/varer/kontoer' handler={AngularWrapper}/>
    <Route name='varer/leverandører' path='/varer/leverandører' handler={AngularWrapper}/>
    <Route name='varer/salgskalkyler' path='/varer/salgskalkyler' handler={AngularWrapper}/>
    <Route name='varer/varetellinger' path='/varer/varetellinger' handler={AngularWrapper}/>
  </Route>
)
