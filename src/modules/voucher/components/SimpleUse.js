import { connect } from "nuclear-js-react-addons-chefsplate"
import React from "react"
import { connect as reduxConnect } from "react-redux"
import { Link } from "react-router-dom"
import Loader from "../../../components/Loader"
import moment from "../../../moment"
import { getUserDetails } from "../../auth/selectors"
import * as actions from "../actions"
import * as getters from "../getters"
import "./SimpleUse.scss"
import UseVouchers from "./UseVouchers"

@connect(() => ({
  uselogs: getters.uselogs,
}))
@reduxConnect((state) => ({
  userDetails: getUserDetails(state),
}))
export default class SimpleUse extends React.Component {
  componentDidMount() {
    actions.fetchUseLogs(1, 5)
  }

  renderDateSpent(val) {
    return moment(val).format("dddd D. MMM YYYY HH:mm")
  }

  renderUseLogs() {
    if (!this.props.uselogs.get("data")) {
      return
    }

    return (
      <div>
        <hr />
        <h3>Previous registrations</h3>
        <ul className="voucher-simpleUse">
          {this.props.uselogs
            .get("data")
            .get("results")
            .toJS()
            .map((uselog) => {
              let who
              if (uselog.wallet.user.realname) {
                who = uselog.wallet.user.realname
              } else {
                who = uselog.wallet.user.username
              }

              return (
                <li key={uselog.id}>
                  <span className="voucher-simpleUse-when">
                    {this.renderDateSpent(uselog.date_spent)}
                  </span>
                  <span className="voucher-simpleUse-who">{who}</span>
                  <span className="voucher-simpleUse-amount">
                    {uselog.vouchers} voucher(s)
                  </span>
                </li>
              )
            })}
        </ul>
        <Link to="/voucher/uselogs">View all usage</Link>
      </div>
    )
  }

  renderNew() {
    if (this.props.userDetails) {
      return (
        <UseVouchers
          defaultUsername={this.props.userDetails.username}
          hidePanel={true}
          useLogsLimit={5}
        />
      )
    }

    return (
      <div className="alert alert-warning">
        You have to <Link to="/login">log in</Link> to register vouchers usage.
      </div>
    )
  }

  render() {
    return (
      <div>
        <h1>Use vouchers</h1>
        {this.renderNew()}
        <Loader
          isLoading={this.props.uselogs.get("isLoading")}
          error={this.props.uselogs.get("error")}
          isEmpty={!this.props.uselogs.get("data")}
        >
          No usage is registered.
        </Loader>
        {this.renderUseLogs()}
      </div>
    )
  }
}
