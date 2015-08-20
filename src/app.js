import './app.scss'
import 'bootstrap-sass'

import domready from 'domready'
import React from 'react'
import Router from 'react-router'
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router'

import reactor from './reactor'

import Root from './components/Root'
import Index from './components/Index'

import Admin from './admin'
import Auth from './modules/auth'
import Cal from './modules/cal'
import Varer from './modules/varer'
import Z from './modules/z'

class App extends React.Component {
  render() {
    return <Root reactor={reactor} />
  }
}

let routes = (
  <Route handler={App}>
    <Route name="index" path="/" handler={Index} />
    {Admin}
    {Auth}
    {Cal}
    {Varer}
    {Z}
  </Route>
)

let rootInstance
Router.run(routes, Router.HistoryLocation, Handler => {
  domready(() => {
    rootInstance = React.render(<Handler/>, document.getElementById('react_container'))
  })
})

if (module.hot) {
  require('react-hot-loader/Injection').RootInstanceProvider.injectProvider({
    getRootInstances: function () {
      // Help React Hot Loader figure out the root component instances on the page:
      return [rootInstance]
    }
  })
}
