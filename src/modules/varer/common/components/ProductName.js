import React from 'react'
import {admin} from '../../../../api'

import Account from './Account'
import ProductStatus from './ProductStatus'

export default class extends React.Component {
  static propTypes = {
    product: React.PropTypes.object.isRequired,
    showAccount: React.PropTypes.bool,
    showAccountGroup: React.PropTypes.bool,
    isInventory: React.PropTypes.bool,
    showLinks: React.PropTypes.bool,
  }

  static defaultProps = {
    showAccount: true,
    isInventory: true,
    showLinks: true,
    showAccountGroup: false,
  }

  render() {
    const product = this.props.product
    const adminModule = this.props.isInventory ? 'råvare' : 'salgsvare'
    const accountKey = this.props.isInventory ? 'innkjopskonto' : 'salgskonto'

    let category
    if (product.get('kategori')) {
      category = product.get('kategori') + ': '
    }

    let tag
    if (product.get('status') != 'OK') {
      tag = <span> <ProductStatus text={product.get('status')}/></span>
    }

    let account
    if (this.props.showAccount) {
      account = (
        <span>
          <br/>
          <Account
            account={product.get(accountKey)}
            showLinks={this.props.showLinks}
            showGroup={this.props.showAccountGroup}/>
        </span>
      )
    }

    return (
      <div className="varer-productName">
        {category}
        {this.props.showLinks ? (
          <a href={admin(`varer/${adminModule}/${product.get('id')}/`)} target="_self">
            {product.get('navn')}
          </a>
        ) : product.get('navn')}
        {tag}
        {account}
      </div>
    )
  }
}
