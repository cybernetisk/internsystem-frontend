import { connect } from "nuclear-js-react-addons-chefsplate"
import React from "react"
import { connect as reduxConnect } from "react-redux"
import { Link } from "react-router-dom"
import { admin } from "../../../../api"
import Loader from "../../../../components/Loader"
import { getIsLoggedIn } from "../../../auth/selectors"
import { MultilineText } from "../../common/components/MultilineText"
import * as actions from "../actions"
import { data, error, isLoading } from "./getters"
import "./Item.scss"
import List from "./List"
import NewCount from "./NewCount"

@connect(() => ({
  data,
  isLoading,
  error,
}))
@reduxConnect((state) => ({
  isLoggedIn: getIsLoggedIn(state),
}))
export default class Item extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    actions.fetchInventoryCountSimple(this.props.match.params.id)
    actions.fetchInventoryCountCounts(this.props.match.params.id)
  }

  renderComment(data) {
    if (data.get("kommentar")) {
      return (
        <div className="varer-inventoryCountReg-item-comment">
          <MultilineText text={data.get("kommentar")} />
        </div>
      )
    }
  }

  renderNewCountForm() {
    if (!this.props.data.get("is_locked")) {
      if (this.props.isLoggedIn) {
        return <NewCount inventoryCountId={this.props.data.get("id")} />
      }

      return (
        <p className="alert alert-warning">
          You have to <Link to="auth.login">log in</Link> to register items.
        </p>
      )
    }
  }

  render() {
    if (this.props.isLoading || this.props.error) {
      return (
        <Loader isLoading={this.props.isLoading} error={this.props.error} />
      )
    }

    return (
      <div>
        <div className="pull-right hidden-print">
          <a
            className="btn btn-default"
            href={admin(`varer/varetelling/${this.props.data.get("id")}/`)}
            target="_self"
          >
            Edit
          </a>{" "}
          <Link
            to={`/varer/inventorycount/${this.props.data.get("id")}`}
            className="btn btn-default"
          >
            Show detailed view
          </Link>
        </div>

        <h1>{this.props.data.get("tittel")}</h1>
        {this.renderComment(this.props.data)}

        {this.renderNewCountForm()}
        <List />
      </div>
    )
  }
}
