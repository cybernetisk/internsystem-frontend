import React from 'react'
import { Link } from 'react-router'
import { connect } from 'nuclear-js-react-addons'
import moment from '../../../moment'

import getters from '../getters'
import * as actions from '../actions'

import Loader from '../../../components/Loader'

@connect(props => ({
  uselogs: getters.uselogs,
}))
export default class List extends React.Component {
  componentDidMount() {
    actions.fetchUseLogs(1)
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
        <p>
          This is currently an experimental feature -
          see <a href="http://bong.cyb.no/">bong.cyb.no</a> for the real list
        </p>
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
            {this.props.uselogs.get('data').get('results').toJS().map((uselog) => (
              <tr key={uselog.id}>
                <td>{this.renderDateSpent(uselog.date_spent)}</td>
                <td>{uselog.wallet.user.username} ({uselog.wallet.user.realname})</td>
                <td>{uselog.vouchers}</td>
                <td>{uselog.wallet.cached_balance}</td>
                <td>{uselog.comment}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>TODO: pagination (currently limited to 50 items)!</p>
      </div>
    )
  }

  render() {
    return (
      <div>
        <h1>Vouchers - use logs</h1>
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
