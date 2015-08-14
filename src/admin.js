import React from 'react'
import {Route} from 'react-router'
import {admin} from './api'

class Admin extends React.Component {

  render() {
    window.location.href = admin(this.props.params.splat)
    return <div>Sending you to Django-admin page</div>
  }
}

export default (
  <Route name="admin" path="/admin/**" handler={Admin} />
)
