import PropTypes from "prop-types"
import React from "react"
import { price } from "../../../../services/FormatService"
import PriceMargin from "./PriceMargin"
import "./SellPrice.scss"

export default class SellPrice extends React.Component {
  static propTypes = {
    isInternal: PropTypes.bool,
    item: PropTypes.object.isRequired,
  }

  static defaultProps = {
    isInternal: false,
  }

  getNoPriceText() {
    return this.props.isInternal ? "See normal" : "No sales"
  }

  getPricePropertyName() {
    return this.props.isInternal ? "pris_intern" : "pris_ekstern"
  }

  renderMargin() {
    if (this.props.item.get("innpris")) {
      let inPrice = this.props.item.get("innpris")
      if (typeof inPrice === "object") {
        inPrice = inPrice.get("pris") / inPrice.get("antall")
      }

      return (
        <div className="varer-sellPrice--priceMargin">
          <PriceMargin
            innPris={inPrice}
            utPris={this.props.item
              .get("salgspris")
              .get(this.getPricePropertyName())}
            utMva={this.props.item.get("salgspris").get("mva")}
          />
        </div>
      )
    }
  }

  render() {
    const pricePropertyName = this.getPricePropertyName()

    if (
      !this.props.item.get("salgspris") ||
      !this.props.item.get("salgspris").get(pricePropertyName)
    ) {
      return <span>{this.getNoPriceText()}</span>
    }

    return (
      <span>
        {price(this.props.item.get("salgspris").get(pricePropertyName), 0)}
        {this.renderMargin()}
      </span>
    )
  }
}
