import React from 'react'

import {price} from '../../../../services/FormatService'

import PrisDato from './PrisDato'

import './Price.scss'

export default class extends React.Component {
  static propTypes = {
    price: React.PropTypes.number.isRequired,
    priceDate: React.PropTypes.string,
    priceDateRelativeTo: React.PropTypes.string,
    pant: React.PropTypes.number,
  }

  render() {
    let pant
    if (this.props.pant) {
      pant = (
        <span className="pris-pant">
          <br/>
          + {price(this.props.pant)} i pant
        </span>
      )
    }

    let priceDate
    if (this.props.priceDate) {
      priceDate = (
        <span>
          <br />
          <PrisDato dato={this.props.priceDate} relativeTo={this.props.priceDateRelativeTo}/>
        </span>
      )
    }

    return (
      <span className='varer-buyPrice'>
        {price(this.props.price)}
        {pant}
        {priceDate}
      </span>
    )
  }
}
