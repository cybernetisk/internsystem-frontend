import React from "react"
import { NavDropdown as RefNavDropdown } from "react-bootstrap"
import { RouteComponentProps, withRouter } from "react-router"

let counter = 0

type BareNavDropdownProps = React.ComponentProps<typeof RefNavDropdown> &
  RouteComponentProps

class BareNavDropdown extends React.Component<
  BareNavDropdownProps,
  {
    isActive: boolean
  }
> {
  private id: string

  constructor(props: BareNavDropdownProps) {
    super(props)
    this.id = props.id || `nav-dropdown-${++counter}`
    this.state = {
      isActive: false,
    }
  }

  checkActive() {
    const dom = document.getElementById(this.id)
    if (!dom || !dom.parentNode) return

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
