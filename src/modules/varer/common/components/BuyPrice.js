import React from 'react'

import Price from './Price'

export default class extends React.Component {
  static propTypes = {
    product: React.PropTypes.object.isRequired
  }

  render() {
    if (!this.props.product.get('innpris')) {
      return null
    }

    return (
      <Price
        price={this.props.product.getIn(['innpris', 'pris'])}
        priceDate={this.props.product.getIn(['innpris', 'dato'])}
        pant={this.props.product.getIn(['innpris', 'pant'])}
        raavareId={this.props.product.get('id')}/>
    )
  }
}
