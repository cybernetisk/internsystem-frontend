import React from 'react'
import ReactDOM from 'react-dom'

import {NavDropdown as RefNavDropdown} from 'react-bootstrap'

export default class NavDropdown extends React.Component {

  static propTypes = RefNavDropdown.propTypes

  constructor(props) {
    super(props)
    this.state = {
      isActive: false
    }
  }

  componentDidUpdate() {
    // this is really a hack to set active-class if a child is active
    // should probably not use DOM-operations like this...
    let dom = ReactDOM.findDOMNode(this)

    let isActive = dom.querySelector('.active') !== null
    if (isActive != this.state.isActive) {
      this.setState({isActive})
    }
  }

  render() {
    let className = this.state.isActive ? 'active' : ''

    return (
      <RefNavDropdown className={className} {...this.props}>
        {this.props.children}
      </RefNavDropdown>
    )
  }
}
