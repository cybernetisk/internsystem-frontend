import PropTypes from "prop-types"
import React from "react"
import "./ProductStatus.scss"

export default class ProductStatus extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
  }

  render() {
    return <span className="varer-productStatus-text">{this.props.text}</span>
  }
}
