import PropTypes from 'prop-types';
import React from 'react'

import {antall} from '../../../../services/FormatService'

import VareMengde from './VareMengde'

import './Quantity.scss'

export default class extends React.Component {
  static propTypes = {
    product: PropTypes.object.isRequired,
    count: PropTypes.object,
    showSpoilage: PropTypes.bool,
  }

  static defaultProps = {
    showSpoilage: true,
  }

  render() {
    const product = this.props.product

    let pieces
    if (product.get('antall') !== 1) {
      let num = product.get('antall')
      if (this.props.count) {
        num *= this.props.count.get('antall')
        num = antall(num)
      }

      pieces = <span className="varer-quantity-antall"><br />({num} pcs)</span>
    }

    let spoilage
    if (product.get('mengde_svinn') && !this.props.count && this.props.showSpoilage) {
      spoilage = (
        <span className="varer-quantity-svinnInfo">
          <br/>
          apx. <VareMengde verdi={product.get('mengde_svinn')} enhet={product.get('enhet')}/> = spoilage
        </span>
      )
    }

    let mengde = product.get('mengde')
    if (this.props.count) {
      mengde *= this.props.count.get('antall')
    }

    return (
      <span className="varer-quantity">
        <VareMengde verdi={mengde} enhet={product.get('enhet')}/>
        {pieces}
        {spoilage}
      </span>
    )
  }
}
