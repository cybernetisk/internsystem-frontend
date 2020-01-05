import React from "react"
import { matchPath, withRouter } from "react-router"
import { Link } from "react-router-dom"

class BareNavLink extends React.Component {
  render() {
    const isActive = matchPath(this.props.location.pathname, {
      path: this.props.to,
      exact: true,
    })

    return (
      <li className={isActive ? "active" : ""}>
        <Link to={this.props.to}>{this.props.children}</Link>
      </li>
    )
  }
}

export default withRouter(BareNavLink)
