import React from 'react'
import './ProductStatus.scss'

export default class extends React.Component {
  static propTypes = {
    text: React.PropTypes.string.isRequired,
  }

  render() {
    return (
      <span className="varer-productStatus-text">
        {this.props.text}
      </span>
    )
  }
}
