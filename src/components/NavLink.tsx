import React from "react"
import { matchPath, RouteComponentProps, withRouter } from "react-router"
import { Link } from "react-router-dom"

interface BareNavLinkProps extends RouteComponentProps {
  to: string
}

class BareNavLink extends React.Component<BareNavLinkProps> {
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
