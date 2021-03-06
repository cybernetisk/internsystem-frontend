import PropTypes from "prop-types"
import React from "react"
import "./PriceDate.scss"

export default class PriceDate extends React.Component {
  static propTypes = {
    dato: PropTypes.string.isRequired,
    relativeTo: PropTypes.string,
  }

  static defaultProps = {
    relativeTo: null,
  }

  render() {
    const relativeTo = this.props.relativeTo
      ? new Date(this.props.relativeTo)
      : new Date()

    const days = (relativeTo - new Date(this.props.dato)) / 86400000
    let theClass

    if (days < 0) theClass = "varer-priceDate-error"
    //else if (this.dato == '2000-01-01')
    //    theClass = 'varer-priceDate-static'
    else if (days < 30) theClass = "varer-priceDate-age1"
    else if (days < 100) theClass = "varer-priceDate-age2"
    else if (days < 180) theClass = "varer-priceDate-age3"
    else if (days < 300) theClass = "varer-priceDate-age4"
    else if (days < 400) theClass = "varer-priceDate-age5"
    else theClass = "varer-priceDate-age6"

    return (
      <span className={"varer-priceDate " + theClass}>{this.props.dato}</span>
    )
  }
}
