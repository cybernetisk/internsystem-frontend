import React from 'react'
import {Route} from 'react-router'
import {admin} from './api'

class Admin extends React.Component {

  componentDidMount() {
    // TODO: this.props.params.splat
    window.location.href = admin()
  }

  render() {
    return <div>Sending you to Django-admin page</div>
  }
}

export default (
  <Route path="/admin/" component={Admin} />
)
