import React from 'react'
import { Link } from 'react-router'
import { connect } from 'nuclear-js-react-addons'
import moment from '../../../moment'

import getters from '../getters'
import * as actions from '../actions'

import Pagination from '../../../components/Pagination'
import Loader from '../../../components/Loader'
import UseVouchers from './UseVouchers'

import { userDetails } from '../../auth/getters'

@connect(props => ({
  uselogs: getters.uselogs,
  userDetails,
}))
export default class List extends React.Component {
  componentDidMount() {
    actions.fetchUseLogs(1)
  }

  handlePageChange(newPage) {
    actions.fetchWorkLogs(newPage)
  }

  renderDateSpent(val) {
    return moment(val).format("dddd DD. MMM YYYY HH:mm")
  }

  renderUseLogs() {
    if (!this.props.uselogs.get('data')) {
      return
    }

    return (
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Time used</th>
              <th>Person</th>
              <th>Vouchers used</th>
              <th>Current balance</th>
              <th>Comment</th>
            </tr>
          </thead>
          <tbody>
            {this.props.uselogs.get('data').get('results').toJS().map((uselog) => {
              let who = uselog.wallet.user.username
              if (uselog.wallet.user.realname) {
                who += ` (${uselog.wallet.user.realname})`
              }
              return (
                <tr key={uselog.id}>
                  <td>{this.renderDateSpent(uselog.date_spent)}</td>
                  <td>{who}</td>
                  <td>{uselog.vouchers}</td>
                  <td>{uselog.wallet.cached_balance}</td>
                  <td>
                    {uselog.comment}
                    {uselog.issuing_user.username == uselog.wallet.user.username
                      ? ''
                      : <div className="small text-muted">Registered by {uselog.issuing_user.username}</div>}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <Pagination
          active={this.props.uselogs.get('data').get('page')}
          pages={this.props.uselogs.get('data').get('pages')}
          onChange={this.handlePageChange} />
      </div>
    )
  }

  renderNew() {
    if (this.props.userDetails) {
      return (
        <UseVouchers default_username={this.props.userDetails.username} />
      )
    }

    return (
      <div className="alert alert-warning">You have to <Link to='auth.login'>log in</Link> to register
        vouchers usage.</div>
    )
  }

  render() {
    return (
      <div>
        <h1>Vouchers - use logs</h1>
        <p>
          If you have any problems go
          to <a href="https://cybernetisk.slack.com/messages/webgruppa/details/">#webgruppa</a> on Slack
        </p>
        {this.renderNew()}
        <Loader
          isLoading={this.props.uselogs.get('isLoading')}
          error={this.props.uselogs.get('error')}
          isEmpty={!this.props.uselogs.get('data')}>
          No use data is registered.
        </Loader>
        {this.renderUseLogs()}
      </div>
    )
  }
}
