import React from 'react'

export default class NavDropdown extends React.Component {

  componentDidUpdate() {
    // this is really a hack to set active-class if a child is active
    // should probably not use DOM-operations like this...
    let dom = React.findDOMNode(this)
    dom.className = dom.querySelector('.active') !== null
      ? 'dropdown active'
      : 'dropdown'
  }

  render() {
    return <li className='dropdown'>{this.props.children}</li>
  }
}
