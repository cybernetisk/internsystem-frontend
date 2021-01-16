import Immutable from "immutable"
import { connect } from "nuclear-js-react-addons-chefsplate"
import React from "react"
import { Link } from "react-router-dom"
import { admin } from "../../../../api"
import Loader from "../../../../components/Loader"
import moment from "../../../../moment"
import { price } from "../../../../services/FormatService"
import withQueryProps from "../../../../utils/withQueryProps"
import AccountFilter from "../../common/components/AccountFilter"
import ListInputQ from "../../common/components/TextInput"
import { createQueryUpdater } from "../../common/functions"
import * as consts from "../../consts"
import * as inventoryItemsActions from "../../inventoryItems/actions"
import * as actions from "../actions"
import { addVare } from "../service"
import {
  accountsForSelectElement,
  filters,
  inventoryCountStore,
  totalSummer,
  totalSummerFiltered,
} from "./getters"
import GroupsList from "./GroupsList"
import ItemListView from "./List"

@connect(() => ({
  data: inventoryCountStore,
  accountsForSelectElement,
  filters,
  totalSummer,
  totalSummerFiltered,
}))
@withQueryProps
export default class Item extends React.Component {
  constructor(props) {
    super(props)

    this.frisokRef = React.createRef()

    this.state = {
      newitems: Immutable.Map(),
      newitemPlace: "",
    }

    this.addNewItem = this.addNewItem.bind(this)
    this.updateQuery = createQueryUpdater(props.history)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleGroupChange = this.handleGroupChange.bind(this)
    this.handleVisibleChange = this.handleVisibleChange.bind(this)
  }

  componentDidMount() {
    actions.fetchInventoryCount(this.props.match.params.id)
    inventoryItemsActions.fetchInventoryItems()

    // timeout is needed because this is done after getting initial state but before adding observer
    // the timeout causes the observer to be added first
    setTimeout(() => {
      actions.updateFilters({
        text: this.props.query.q || "",
        group: parseInt(this.props.query.group) || null,
        f: this.props.query.f || this.props.filters.get("f"),
      })
    })
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if (
      newProps.query.q != this.props.query.q ||
      newProps.query.group != this.props.query.group ||
      newProps.query.f != this.props.query.f
    ) {
      let f = newProps.query.f
      if (
        typeof f === "undefined" ||
        !consts.inventoryCountOptions.has(newProps.query.f)
      ) {
        f = consts.inventoryCountOptionsDefault
      }

      actions.updateFilters({
        text: newProps.query.q || "",
        group: parseInt(newProps.query.group) || null,
        f,
      })
    }
  }

  handleSearch(e) {
    actions.updateFilters({ text: e.target.value })
    this.updateQuery("q", e.target.value !== "" ? e.target.value : undefined)
  }

  handleGroupChange(e) {
    let group = e.target.value
    if (group === "0") {
      group = null
    } else if (parseInt(group) + "" == group) {
      group = parseInt(group)
    }

    actions.updateFilters({ group })
    this.updateQuery("group", group)
  }

  handleVisibleChange(e) {
    let f = e.target.value
    actions.updateFilters({ f })

    if (f === consts.inventoryCountOptionsDefault) {
      f = undefined
    }

    this.updateQuery("f", f)
  }

  addNewItem(raavare) {
    const newItem = {
      antall: "",
      antallpant: "",
      kommentar: "",
      sted: this.state.newitemPlace,
      removeHandle: () => {
        let newitems = this.state.newitems.updateIn(
          [raavare.get("id")],
          (items) => items.filter((item) => item != newItem),
        )
        if (newitems.get(raavare.get("id")).size == 0) {
          newitems = newitems.delete(raavare.get("id"))
        }

        this.setState({
          newitems,
        })

        this.frisokRef.current.input.select()
      },
      storeHandle: (data) => {
        console.log("storeHandle", data)
        data.raavare = raavare.get("id")
        data.varetelling = this.props.data.get("data").get("id")

        this.setState({
          newitemPlace: data.sted,
        })

        addVare(data).then(
          (res) => {
            actions.vareAdded(this.props.data.get("data").get("id"), res)
            this.frisokRef.current.input.select()
            newItem.removeHandle()
          },
          (err) => {
            alert(err.responseText)
          },
        )
      },
      changeHandleBind: (field) => (event) => {
        // we actually modify the state directly here and not through setState
        newItem[field] = event.target.value
        this.forceUpdate()
      },
    }

    this.setState({
      newitems: this.state.newitems.set(
        raavare.get("id"),
        this.state.newitems
          .get(raavare.get("id"), Immutable.List())
          .push(newItem),
      ),
    })
  }

  renderList() {
    if (this.props.filters.get("f") == "groupsonly") {
      return <GroupsList />
    } else {
      return (
        <ItemListView
          newItem={this.addNewItem}
          newitems={this.state.newitems}
          countDate={this.props.data.get("data").get("tid")}
        />
      )
    }
  }

  render() {
    if (this.props.data.get("isLoading") || this.props.data.get("error")) {
      return (
        <Loader
          isLoading={this.props.data.get("isLoading")}
          error={this.props.data.get("error")}
        />
      )
    }

    const item = this.props.data.get("data").toJS()

    const summer = this.props.totalSummer.toJS()
    const summerFiltered = this.props.totalSummerFiltered.toJS()
    const showFilteredSummer = summer.count != summerFiltered.count

    return (
      <div className="varetellinger-item">
        <div className="pull-right hidden-print">
          <a
            className="btn btn-default"
            href={admin(`varer/varetelling/${item.id}/`)}
            target="_self"
          >
            Edit
          </a>{" "}
          <Link
            to={`/varer/inventorycount/${this.props.data.get(
              "id",
            )}/registrations`}
            className="btn btn-default"
          >
            Show registrations view
          </Link>
        </div>

        <h1>Inventory count</h1>

        <dl className="dl-horizontal">
          <dt>Title</dt>
          <dd>{item.tittel}</dd>
          <dt>Time</dt>
          <dd>{moment(item.tid).format("YYYY-MM-DD HH:mm")}</dd>
          {item.kommentar
            ? [
                <dt key="kommentar-dt">Comment</dt>,
                <dd key="kommentar-dd">{item.kommentar}</dd>,
              ]
            : ""}
          <dt>Responsible</dt>
          <dd>{item.ansvarlig}</dd>
          {summer
            ? [
                <dt key="summer-dt">Total value (ex. VAT)</dt>,
                <dd key="summer-dd">
                  {price(summer.sum + summer.pant)} ({price(summer.sum)} +{" "}
                  {price(summer.pant)} i pant)
                </dd>,
              ]
            : ""}
          {showFilteredSummer
            ? [
                <dt key="filteredsummer-dt">By search filter</dt>,
                <dd key="filteredsummer-dd">
                  {price(summerFiltered.sum + summerFiltered.pant)} (
                  {price(summerFiltered.sum)} + {price(summerFiltered.pant)} i
                  pant)
                </dd>,
              ]
            : ""}
        </dl>

        <h2>Products</h2>

        <p className="text-muted hidden-print">
          Press ctrl+down or ctrl+up to move focus. Press + to quicky add new
          count.
        </p>

        <div className="row hidden-print">
          <div className="form-group col-md-6">
            <label>Search</label>
            <ListInputQ
              autofocus={true}
              onChange={this.handleSearch}
              value={this.props.filters.get("text")}
              ref={this.frisokRef}
            />
          </div>
          <div className="form-group col-md-3">
            <label>Group</label>
            <AccountFilter
              onChange={this.handleGroupChange}
              value={this.props.filters.get("group", "")}
              accounts={this.props.accountsForSelectElement}
            />
          </div>
          <div className="form-group col-md-3">
            <label>Filtering</label>
            <select
              className="form-control"
              onChange={this.handleVisibleChange}
              value={this.props.filters.get("f", "")}
            >
              {consts.inventoryCountOptions.map((option, key) => (
                <option value={key} key={key}>
                  {option.get("text")}
                </option>
              ))}
            </select>
          </div>
        </div>

        {this.renderList()}
      </div>
    )
  }
}
