import React from "react"
import { NavDropdown as RefNavDropdown } from "react-bootstrap"
import { withRouter } from "react-router"

let counter = 0

class BareNavDropdown extends React.Component {
  static propTypes = RefNavDropdown.propTypes

  constructor(props) {
    super(props)
    this.id = props.id || `nav-dropdown-${++counter}`
    this.state = {
      isActive: false,
    }
  }

  checkActive() {
    const dom = document.getElementById(this.id)
    if (!dom) return

    const isActive = dom.parentNode.querySelector(".active") !== null
    if (isActive != this.state.isActive) {
      this.setState({ isActive })
    }
  }

  componentDidUpdate() {
    this.checkActive()
  }

  componentDidMount() {
    this.checkActive()
  }

  render() {
    const className = this.state.isActive ? "active" : ""

    return (
      <RefNavDropdown className={className} id={this.id} {...this.props}>
        {this.props.children}
      </RefNavDropdown>
    )
  }
}

export default withRouter(BareNavDropdown)
