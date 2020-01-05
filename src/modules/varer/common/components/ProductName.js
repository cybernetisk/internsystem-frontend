import PropTypes from "prop-types"
import React from "react"
import { admin } from "../../../../api"
import Account from "./Account"
import "./ProductName.scss"
import ProductStatus from "./ProductStatus"

export default class ProductName extends React.Component {
  static propTypes = {
    product: PropTypes.object.isRequired,
    showAccount: PropTypes.bool,
    showAccountGroup: PropTypes.bool,
    isInventory: PropTypes.bool,
    showLinks: PropTypes.bool,
  }

  static defaultProps = {
    showAccount: true,
    isInventory: true,
    showLinks: true,
    showAccountGroup: false,
  }

  render() {
    const product = this.props.product
    const adminModule = this.props.isInventory ? "råvare" : "salgsvare"
    const accountKey = this.props.isInventory ? "innkjopskonto" : "salgskonto"

    let category
    if (product.get("kategori")) {
      category = product.get("kategori") + ": "
    }

    let type
    if (this.props.isInventory && product.get("type")) {
      type = ` (${product.get("type")})`
    }

    let tag
    if (product.get("status") != "OK") {
      tag = (
        <span>
          {" "}
          <ProductStatus text={product.get("status")} />
        </span>
      )
    }

    let account
    if (this.props.showAccount) {
      account = (
        <span>
          <br />
          <Account
            account={product.get(accountKey)}
            showLinks={this.props.showLinks}
            showGroup={this.props.showAccountGroup}
          />
        </span>
      )
    }

    return (
      <div className="varer-productName">
        {category}
        {this.props.showLinks ? (
          <a
            href={admin(`varer/${adminModule}/${product.get("id")}/`)}
            target="_self"
          >
            {product.get("navn")}
          </a>
        ) : (
          product.get("navn")
        )}
        {type}
        {tag}
        {account}
      </div>
    )
  }
}
