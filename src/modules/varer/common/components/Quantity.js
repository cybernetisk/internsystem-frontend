import React from 'react'

import VareMengde from './VareMengde'

export default class extends React.Component {
  static propTypes = {
    product: React.PropTypes.object.isRequired
  }

  render() {
    const product = this.props.product

    let pieces
    if (product.get('antall') !== 1) {
      pieces = <span className="vare-antall"><br />({product.get('antall')} pcs)</span>
    }

    let spoilage
    if (product.get('mengde_svinn')) {
      spoilage = (
        <span className="svinn-info">
          <br/>
          apx. <VareMengde verdi={product.get('mengde_svinn')} enhet={product.get('enhet')}/> = spoilage
        </span>
      )
    }

    return (
      <span className="varer-quantity">
        <VareMengde verdi={product.get('mengde')} enhet={product.get('enhet')}/>
        {pieces}
        {spoilage}
      </span>
    )
  }
}
