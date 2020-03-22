import { connect } from "nuclear-js-react-addons-chefsplate"
import React from "react"
import { admin } from "../../../../api"
import moment from "../../../../moment"
import { antall } from "../../../../services/FormatService"
import Price from "../../common/components/Price"
import ProductName from "../../common/components/ProductName"
import Quantity from "../../common/components/Quantity"
import { counts, time } from "./getters"
import "./List.scss"

@connect(() => ({
  counts,
  time,
}))
export default class List extends React.Component {
  renderRegDate(count) {
    let addedTime = null
    if (count.get("time_added")) {
      addedTime = moment(count.get("time_added")).format("YYYY-MM-DD HH:mm")
    }

    let regBy = null
    if (count.get("added_by")) {
      regBy = `by ${count.getIn(["added_by", "username"])}`
    }

    if (!addedTime && !regBy) return null

    return (
      <div className="varer-regBy">
        Registered {addedTime} {regBy}
      </div>
    )
  }

  renderPriceDate(count) {
    if (count.get("time_price")) {
      return (
        <div className="varer-timePrice">
          Prices relates to{" "}
          {moment(count.get("time_price")).format("YYYY-MM-DD")}
        </div>
      )
    }
  }

  render() {
    if (this.props.counts.size === 0) return <p>No data found.</p>

    return (
      <table className="table table-condensed table-striped varer-table varer-inventoryCountRegistrationsList">
        <thead>
          <tr>
            <th>Raw material</th>
            <th colSpan="2">Quantity</th>
            <th>Value ex. VAT</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {this.props.counts.map((count) => (
            <tr key={count.get("id")}>
              <td>
                <ProductName product={count.get("raavare")} />
              </td>
              <td>
                {antall(count.get("antall"))} x{" "}
                <Quantity product={count.get("raavare")} showSpoilage={false} />
              </td>
              <td>
                <Quantity product={count.get("raavare")} count={count} />
                {count.get("sted") ? <div>({count.get("sted")})</div> : ""}
              </td>
              <td>
                <Price
                  price={count.getIn(["summer", "sum"])}
                  priceDate={count.getIn(["raavare", "innpris", "dato"])}
                  priceDateRelativeTo={
                    count.get("time_price") || this.props.time
                  }
                  pant={count.getIn(["summer", "pant"])}
                  raavareId={count.getIn(["raavare", "id"])}
                />
              </td>
              <td>
                <div>{count.get("kommentar")}</div>
                {this.renderRegDate(count)}
                {this.renderPriceDate(count)}
              </td>
              <td>
                <a
                  href={admin(`varer/varetellingvare/${count.get("id")}/`)}
                  target="_self"
                >
                  <i className="glyphicon glyphicon-pencil" />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}
