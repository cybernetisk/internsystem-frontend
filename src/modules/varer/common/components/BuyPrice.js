import PropTypes from "prop-types"
import React from "react"
import NoPrice from "./NoPrice"
import Price from "./Price"

export default class BuyPrice extends React.Component {
  static propTypes = {
    product: PropTypes.object.isRequired,
  }

  render() {
    if (!this.props.product.get("innpris")) {
      return <NoPrice />
    }

    return (
      <Price
        price={
          this.props.product.getIn(["innpris", "pris"]) /
          this.props.product.getIn(["innpris", "antall"])
        }
        priceDate={this.props.product.getIn(["innpris", "dato"])}
        pant={
          this.props.product.getIn(["innpris", "pant"]) /
          this.props.product.getIn(["innpris", "antall"])
        }
        raavareId={this.props.product.get("id")}
      />
    )
  }
}
