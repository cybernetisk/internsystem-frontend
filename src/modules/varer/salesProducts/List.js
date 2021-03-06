import { connect } from "nuclear-js-react-addons-chefsplate"
import PropTypes from "prop-types"
import React from "react"
import Loader from "../../../components/Loader"
import withQueryProps from "../../../utils/withQueryProps"
import { createQueryUpdater } from "../common/functions"
import AccountFilter from "./../common/components/AccountFilter"
import ListInputQ from "./../common/components/TextInput"
import * as consts from "./../consts"
import { fetchSalesProducts, updateFilters } from "./actions"
import {
  filteredSalesProducts,
  filters,
  salesProductsLoader,
  selectGroups,
} from "./getters"
import "./List.scss"
import ListTable from "./ListTable"

@connect(() => ({
  selectGroups,
  filters,
  salesProducts: filteredSalesProducts,
  salesProductsLoader,
}))
@withQueryProps
export default class List extends React.Component {
  static propTypes = {
    query: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.updateQuery = createQueryUpdater(props.history)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleGroupChange = this.handleGroupChange.bind(this)
    this.handleOutdatedChange = this.handleOutdatedChange.bind(this)
  }

  componentDidMount() {
    fetchSalesProducts()

    // timeout is needed because this is done after getting initial state but before adding observer
    // the timeout causes the observer to be added first
    setTimeout(() => {
      updateFilters({
        text: this.props.query.q || "",
        group: parseInt(this.props.query.group) || null,
      })
    })
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if (
      newProps.query.q != this.props.query.q ||
      newProps.query.group != this.props.query.group ||
      newProps.query.outdated != this.props.query.outdated
    ) {
      let outdated = newProps.query.outdated
      if (
        typeof outdated === "undefined" ||
        !consts.outdatedOptions.has(newProps.query.outdated)
      ) {
        outdated = consts.outdatedOptionsDefault
      }

      updateFilters({
        text: newProps.query.q || "",
        group: parseInt(newProps.query.group) || null,
        outdated,
      })
    }
  }

  handleSearch(e) {
    updateFilters({ text: e.target.value })
    this.updateQuery("q", e.target.value !== "" ? e.target.value : undefined)
  }

  handleGroupChange(e) {
    let group = e.target.value
    if (group === "0") {
      group = null
    } else if (parseInt(group) + "" == group) {
      group = parseInt(group)
    }

    updateFilters({ group })
    this.updateQuery("group", group)
  }

  handleOutdatedChange(e) {
    let outdated = e.target.value
    updateFilters({ outdated })

    if (outdated === consts.outdatedOptionsDefault) {
      outdated = undefined
    }

    this.updateQuery("outdated", outdated)
  }

  renderSalesProducts(salesProducts) {
    return (
      <div>
        <div className="row">
          <div className="form-group col-md-6">
            <label>Search for products</label>
            <ListInputQ
              autofocus={true}
              onChange={this.handleSearch}
              value={this.props.filters.get("text")}
            />
          </div>

          <div className="form-group col-md-3">
            <label>Group</label>
            <AccountFilter
              onChange={this.handleGroupChange}
              value={this.props.filters.get("group", "")}
              accounts={this.props.selectGroups}
            />
          </div>

          <div className="form-group col-md-3">
            <label>Outdated products</label>
            <select
              className="form-control"
              onChange={this.handleOutdatedChange}
              value={this.props.filters.get("outdated", "")}
            >
              {consts.outdatedOptions.map((option, key) => (
                <option value={key} key={key}>
                  {option.get("text")}
                </option>
              ))}
            </select>
          </div>
        </div>

        {salesProducts.count() ? (
          <ListTable salesProducts={salesProducts} />
        ) : (
          <p>No products matched search criteria.</p>
        )}
      </div>
    )
  }

  render() {
    return (
      <div className="salgsvarer-index">
        <h1>Sales products</h1>

        <Loader {...this.props.salesProductsLoader}>
          No sales products exist.
        </Loader>

        {!this.props.salesProductsLoader.isEmpty
          ? this.renderSalesProducts(this.props.salesProducts)
          : ""}
      </div>
    )
  }
}
