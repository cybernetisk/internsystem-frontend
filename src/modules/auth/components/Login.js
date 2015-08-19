import React from 'react'
import {saml} from '../../../api'

export default class Login extends React.Component {
  componentDidMount() {
    window.location.href = saml('?sso')
  }

  render() {
    return <div>Redirecting to actual log in page</div>
  }
}
