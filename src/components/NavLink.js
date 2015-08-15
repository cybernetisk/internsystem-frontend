import React from 'react'
import {Link} from 'react-router'

export default class NavLink extends React.Component {

  static contextTypes = {
    router: React.PropTypes.func
  }

  render() {
    let isActive = this.context.router.isActive(this.props.to, this.props.params, this.props.query)
    let className = isActive ? 'active' : ''
    return <li className={className}><Link {...this.props} /></li>
  }
}
