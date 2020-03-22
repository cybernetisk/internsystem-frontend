import { connect } from "nuclear-js-react-addons-chefsplate"
import React from "react"
import { connect as reduxConnect } from "react-redux"
import { Link } from "react-router-dom"
import Loader from "../../../components/Loader"
import { getUserDetails } from "../../auth/selectors"
import * as actions from "../actions"
import * as getters from "../getters"
import VoucherService from "../services/VoucherService"

@connect(() => ({
  stats: getters.stats,
}))
@reduxConnect((state) => ({
  userDetails: getUserDetails(state),
}))
export default class Stats extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      myWallets: [],
    }
  }

  componentDidMount() {
    actions.fetchStats()

    if (this.props.userDetails) {
      this.loadMyWallets(this.props.userDetails.username)
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.userDetails) {
      this.loadMyWallets(nextProps.userDetails.username)
    }
  }

  // we cheat here and skip the whole state cycle and just do the request directly from here
  loadMyWallets(username) {
    if (this.state.myWalletsLoaded) {
      return
    }

    this.setState({
      myWalletsLoaded: true,
    })

    VoucherService.getWallets({
      user: username,
    }).then((res) => {
      this.setState({
        myWallets: res,
      })
    })
  }

  renderWalletBalance(wallet) {
    const myWallet = this.state.myWallets.find(
      (myWallet) => myWallet.semester.id === wallet.semester.id,
    )
    if (myWallet) {
      const balance = myWallet.cached_balance
      if (myWallet.is_valid) {
        return balance
      } else {
        return `${balance} (expired)`
      }
    } else {
      return 0
    }
  }

  renderStats() {
    if (!this.props.stats.get("data")) {
      return
    }

    const showCurrentUser = this.state.myWallets.length > 0

    return (
      <div>
        <p>
          If you have any problems go to{" "}
          <a href="https://cybernetisk.slack.com/messages/it/details/">#it</a>{" "}
          on Slack
        </p>
        <div className="pull-right">
          <Link to="/voucher/worklogs" className="btn btn-success">
            Register work
          </Link>{" "}
          <Link to="/voucher/uselogs" className="btn btn-primary">
            Use vouchers
          </Link>
        </div>
        {this.props.children}
        <h2>Semester list</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Semester</th>
              <th>Sum vouchers</th>
              <th>Unused vouchers</th>
              <th>Used vouchers</th>
              <th>People</th>
              {showCurrentUser ? <th>Your balance</th> : null}
            </tr>
          </thead>
          <tbody>
            {this.props.stats
              .get("data")
              .toList()
              .toJS()
              .map((wallet) => (
                <tr key={wallet.semester.id}>
                  <td>
                    <Link to={`/voucher/semester/${wallet.semester.id}`}>
                      {wallet.semester.year} {wallet.semester.semester}
                    </Link>
                  </td>
                  <td>{wallet.sum_vouchers}</td>
                  <td>{wallet.sum_balance}</td>
                  <td>{wallet.sum_vouchers_used}</td>
                  <td>{wallet.count_users}</td>
                  {showCurrentUser ? (
                    <td>{this.renderWalletBalance(wallet)}</td>
                  ) : null}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    )
  }

  render() {
    return (
      <div>
        <h1>Vouchers</h1>
        <Loader
          isLoading={this.props.stats.get("isLoading")}
          error={this.props.stats.get("error")}
          isEmpty={!this.props.stats.get("data")}
        >
          No voucher data is registered.
        </Loader>
        {this.renderStats()}
      </div>
    )
  }
}
