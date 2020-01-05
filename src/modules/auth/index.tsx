import React from "react"
import { Route } from "react-router"
import { store } from "../../store"
import Login from "./components/Login"
import Logout from "./components/Logout"
import { Profile } from "./components/Profile"
import { fetchAuthAsync } from "./duck"

// TODO: Should be done in a React component.
store.dispatch(fetchAuthAsync.request())

export default (
  <React.Fragment>
    <Route exact path="/profile" component={Profile} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/logout" component={Logout} />
  </React.Fragment>
)
