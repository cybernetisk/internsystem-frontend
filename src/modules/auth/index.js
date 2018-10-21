import React from 'react'
import { Route } from 'react-router'
import { provideReactor } from 'nuclear-js-react-addons-chefsplate'

import reactor from '../../reactor'
import * as actions from './actions'

import Profile from './components/Profile'
import Login from './components/Login'
import Logout from './components/Logout'

import AuthStore from './stores/AuthStore'

reactor.registerStores({
  authdata: AuthStore
})

actions.fetchAuthData()

export default (
  <React.Fragment>
    <Route exact path="/profile" component={Profile} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/logout" component={Logout} />
  </React.Fragment>
)
