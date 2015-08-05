import React from 'react'
import { Route, RouteHandler } from 'react-router'
import { provideReactor } from 'nuclear-js-react-addons'

import reactor from '../../reactor'
import actions from './actions'

import Profile from './components/Profile'
import Login from './components/Login'
import Logout from './components/Logout'

import AuthStore from './stores/AuthStore'

reactor.registerStores({
  authdata: AuthStore
})

actions.fetchAuthData()

module.exports = (
  <Route>
    <Route name="auth.profile" path="/profile" handler={Profile} />
    <Route name="auth.login" path="/login" handler={Login} />
    <Route name="auth.logout" path="/logout" handler={Logout} />
  </Route>
)
