import React from 'react'
import {saml} from '../../../api'

export default class Login extends React.Component {
  componentDidMount() {
    console.log('go to login url')
    window.location.href = saml('?sso')
  }

  render() {
    return <div>Sender deg til innloggingsside</div>
  }
}
