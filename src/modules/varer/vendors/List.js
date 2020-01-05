import { connect } from "nuclear-js-react-addons-chefsplate"
import React from "react"
import Markdown from "react-remarkable"
import { admin } from "../../../api"
import Loader from "../../../components/Loader"
import { fetchVendors } from "./actions"
import { vendors } from "./getters"
import "./List.scss"

@connect(() => ({
  vendors,
}))
export default class List extends React.Component {
  componentDidMount() {
    fetchVendors()
  }

  renderVendorList(vendors) {
    return (
      <table className="table table-striped varerVendorsList">
        <thead>
          <tr>
            <th>ID</th>
            <th>Vendor name</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map(vendor => (
            <tr key={vendor.id}>
              <td>{vendor.id}</td>
              <td>
                <a
                  href={admin(`varer/leverandør/${vendor.id}/`)}
                  target="_self"
                >
                  {vendor.navn}
                </a>
              </td>
              <td>
                <Markdown source={vendor.kommentar} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  render() {
    const vendors = this.props.vendors.get("items").toJS()

    return (
      <div>
        <h1>Vendor list</h1>

        <Loader
          isLoading={this.props.vendors.get("isLoading")}
          error={this.props.vendors.get("error")}
          isEmpty={this.props.vendors.get("items").isEmpty()}
        >
          No vendors exist.
        </Loader>

        {vendors.length ? this.renderVendorList(vendors) : ""}
      </div>
    )
  }
}
