import React from 'react'

import {price} from '../../../../services/FormatService'

import PrisMargin from './PrisMargin'

export default class extends React.Component {

  static propTypes = {
    isInternal: React.PropTypes.bool,
    item: React.PropTypes.object.isRequired
  }

  static defaultProps = {
    isInternal: false
  }

  getNoPriceText() {
    return this.props.isInternal
      ? 'See normal'
      : 'No sales'
  }

  getPricePropertyName() {
    return this.props.isInternal
      ? 'pris_intern'
      : 'pris_ekstern'
  }

  renderMargin() {
    if (this.props.item.get('innpris')) {
      let inPrice = this.props.item.get('innpris')
      if (typeof inPrice === 'object') {
        inPrice = inPrice.get('pris')
      }

      return [
        <br/>,
        <PrisMargin innPris={inPrice}
          utPris={this.props.item.get('salgspris').get(this.getPricePropertyName())}
          utMva={this.props.item.get('salgspris').get('mva')}/>
      ]
    }
  }

  render() {
    let pricePropertyName = this.getPricePropertyName()

    if (!this.props.item.get('salgspris') || !this.props.item.get('salgspris').get(pricePropertyName)) {
      return <span>{this.getNoPriceText()}</span>
    }

    return (
      <span>
        {price(this.props.item.get('salgspris').get(pricePropertyName), 0)}
        {this.renderMargin()}
      </span>
    )
  }
}