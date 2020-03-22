import PropTypes from "prop-types"
import React from "react"
import { admin } from "../../../api"
import { price } from "../../../services/FormatService"
import PriceDate from "../common/components/PriceDate"
import ProductName from "../common/components/ProductName"
import ProductStatus from "../common/components/ProductStatus"
import SellPrice from "../common/components/SellPrice"
import VareMengde from "../common/components/VareMengde"
import "./ListTable.scss"

export default class ListTable extends React.Component {
  static propTypes = {
    salesProducts: PropTypes.object.isRequired,
  }

  renderInventoryItems(item) {
    if (!item.get("raavarer").count()) {
      return
    }

    return (
      <ul>
        {item.get("raavarer").map((meta) => {
          let quantity
          if (meta.get("mengde") != meta.get("raavare").get("mengde")) {
            quantity = (
              <span>
                <VareMengde
                  verdi={meta.get("mengde")}
                  enhet={meta.get("raavare").get("enhet")}
                />{" "}
              </span>
            )
          }

          let buyprice
          if (meta.get("innpris")) {
            buyprice = (
              <span>
                {" "}
                ({price(meta.get("innpris_accurate"))}{" "}
                <PriceDate dato={meta.get("innpris").get("dato")} />)
              </span>
            )
          }

          let tag
          if (meta.get("raavare").get("status") != "OK") {
            tag = (
              <span>
                {" "}
                <ProductStatus text={meta.get("raavare").get("status")} />
              </span>
            )
          }

          return (
            <li key={meta.get("id")}>
              {quantity}
              <a href={admin(`varer/råvare/${meta.get("raavare").get("id")}/`)}>
                {meta.get("raavare").get("navn")}
              </a>
              {tag}
              {buyprice}
            </li>
          )
        })}
      </ul>
    )
  }

  render() {
    let lastGroup

    return (
      <table className="table table-striped table-condensed varer-table varer-salesProducts-listTable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Register#</th>
            <th>Internal price</th>
            <th>Normal price</th>
            <th>Inventory items (ex. VAT)</th>
          </tr>
        </thead>
        <tbody>
          {this.props.salesProducts.reduce((prev, item) => {
            if (lastGroup != item.get("salgskonto").get("gruppe")) {
              lastGroup = item.get("salgskonto").get("gruppe")
              prev.push(
                <tr
                  className="group-row"
                  key={item.get("salgskonto").get("gruppe")}
                >
                  <th colSpan="5">{item.get("salgskonto").get("gruppe")}</th>
                </tr>,
              )
            }

            prev.push(
              <tr key={item.get("id")}>
                <td>
                  <ProductName product={item} isInventory={false} />
                </td>
                <td>{item.get("kassenr")}</td>
                <td>
                  <SellPrice item={item} isInternal={true} />
                </td>
                <td>
                  <SellPrice item={item} isInternal={false} />
                </td>
                <td>{this.renderInventoryItems(item)}</td>
              </tr>,
            )

            return prev
          }, [])}
        </tbody>
      </table>
    )
  }
}
