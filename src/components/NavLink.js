import React from 'react'
import { Link } from 'react-router-dom'
import { matchPath, withRouter } from 'react-router'

class BareNavLink extends React.Component {

  render() {
    let isActive = matchPath(this.props.location.pathname, {
      path: this.props.to,
      exact: true,
    })

    return (
      <li className={isActive ? 'active' : ''}>
        <Link to={this.props.to}>
          {this.props.children}
        </Link>
      </li>
    )
  }
}

export default withRouter(BareNavLink)
