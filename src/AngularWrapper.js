import React from 'react'
import './angularModule'
import jquery from 'jquery'

import './angular_common/antall.filter.js'
import './angular_common/loader.directive.js'
import './angular_common/pagination.directive.js'
import './angular_common/price.filter.js'

function createAngularRootElement() {
  let root = document.createElement('div')

  let subElm = document.createElement('div')
  subElm.setAttribute('data-ui-view', '')
  root.appendChild(subElm)

  return root
}

let angularRootElement = createAngularRootElement()
let angularHasBootstrapped = false

export default class AngularWrapper extends React.Component {
  componentDidMount() {
    let firstRun = !angularHasBootstrapped
    if (firstRun) {
      console.log('angular bootstrapped')
      angular.bootstrap(angularRootElement, ['cyb.oko'])
      angularHasBootstrapped = true
    }

    React.findDOMNode(this.refs.angular).appendChild(angularRootElement)

    if (!firstRun) {
      // force update of new location
      jquery(window).triggerHandler('popstate')
    }
  }

  componentWillReceiveProps() {
    // props should only change on url change, so trigger popstate to notify angular of new location
    jquery(window).triggerHandler('popstate')
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
