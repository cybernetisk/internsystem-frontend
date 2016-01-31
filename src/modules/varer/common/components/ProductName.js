import React from 'react'
import {admin} from '../../../../api'

export default class extends React.Component {
  static propTypes = {
    product: React.PropTypes.object.isRequired,
    showAccount: React.PropTypes.bool,
    isInventory: React.PropTypes.bool,
  }

  static defaultProps = {
    showAccount: true,
    isInventory: true,
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
      tag = <span> <span className="status-text">{product.get('status')}</span></span>
    }

    let account
    if (this.props.showAccount) {
      account = (
        <span>
          <br/>
          <a className="gruppe-link" href={admin(`varer/konto/${product.get(accountKey).get('id')}/`)}>
            {product.get(accountKey).get('navn')}
          </a>
        </span>
      )
    }

    return (
      <div className="varer-productName">
        {category}
        <a href={admin(`varer/${adminModule}/${product.get('id')}/`)} target="_self">{product.get('navn')}</a>
        {tag}
        {account}
      </div>
    )
  }
}
