import PropTypes from 'prop-types';
import React from 'react'
import {price} from '../../../../services/FormatService'

import './PriceMargin.scss'

export default class extends React.Component {
  static propTypes = {
    innPris: PropTypes.number.isRequired,
    utPris: PropTypes.number.isRequired,
    utMva: PropTypes.number.isRequired
  }

  render() {
    let eksmva = this.props.utPris / (1 + this.props.utMva / 100)
    let margin = (((eksmva - this.props.innPris) / eksmva) * 100)
    let theClass

    if (margin > 150)
      theClass = 'varer-priceMargin-veryhigh'
    else if (margin > 100)
      theClass = 'varer-priceMargin-higher'
    else if (margin > 50)
      theClass = 'varer-priceMargin-high'
    else if (margin > 20)
      theClass = 'varer-priceMargin-ok'
    else if (margin > 10)
      theClass = 'varer-priceMargin-low'
    else if (margin < 0)
      theClass = 'varer-priceMargin-subzero'
    else
      theClass = 'varer-priceMargin-verylow'

    margin = margin.toFixed(1).toString().replace('.', ',')

    return (
      <span className={'varer-priceMargin ' + theClass}>
        {margin} %
        <span className="varer-priceMargin-kr"> ({price(eksmva - this.props.innPris, 2)})</span>
      </span>)
  }
}
