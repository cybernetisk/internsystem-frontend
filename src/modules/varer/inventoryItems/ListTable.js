import PropTypes from "prop-types"
import React from "react"
import BuyPrice from "../common/components/BuyPrice"
import ProductName from "../common/components/ProductName"
import Quantity from "../common/components/Quantity"
import SellPrice from "../common/components/SellPrice"

export default class ListTable extends React.Component {
  static propTypes = {
    inventoryItems: PropTypes.object.isRequired,
  }

  renderInternalPrice(item) {
    if (item.get("salgspris")) {
      return <SellPrice item={item} isInternal={true} />
    }
  }

  renderNormalPrice(item) {
    if (item.get("salgspris")) {
      return <SellPrice item={item} isInternal={false} />
    }
  }

  render() {
    let lastGroup = null

    return (
      <table className="table table-striped table-condensed varer-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price ex. VAT</th>
            <th>Internal price</th>
            <th>Normal price</th>
          </tr>
        </thead>
        <tbody>
          {this.props.inventoryItems.reduce((prev, item) => {
            if (lastGroup !== item.get("innkjopskonto").get("gruppe")) {
              lastGroup = item.get("innkjopskonto").get("gruppe")
              prev.push(
                <tr
                  className="group-row"
                  key={item.get("innkjopskonto").get("gruppe")}
                >
                  <th colSpan="5">{item.get("innkjopskonto").get("gruppe")}</th>
                </tr>,
              )
            }

            prev.push(
              <tr key={item.get("id")}>
                <td>
                  <ProductName product={item} />
                </td>
                <td>
                  <Quantity product={item} />
                </td>
                <td>
                  <BuyPrice product={item} />
                </td>
                <td>{this.renderInternalPrice(item)}</td>
                <td>{this.renderNormalPrice(item)}</td>
              </tr>,
            )
            return prev
          }, [])}
        </tbody>
      </table>
    )
  }
}
