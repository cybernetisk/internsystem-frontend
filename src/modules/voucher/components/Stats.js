import React from 'react'
import { Link } from 'react-router'
import { nuclearComponent } from 'nuclear-js-react-addons'

import getters from '../getters'
import * as actions from '../actions'

import Loader from '../../../components/Loader'

export default
@nuclearComponent({
  stats: getters.stats,
})
class List extends React.Component {
  componentDidMount() {
    actions.fetchStats()
  }

  renderStats() {
    if (!this.props.stats.get('data')) {
      return
    }

    return [
      <p>This is currently an experimental feature - see <a href="http://bong.cyb.no/">bong.cyb.no</a> for the real list</p>,
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Semester</th>
            <th>Balance</th>
            <th>In</th>
            <th>Used</th>
            <th>Users</th>
          </tr>
        </thead>
        <tbody>
          {this.props.stats.get('data').toList().toJS().map((wallet) => (
            <tr key={wallet.semester.id}>
              <td>{wallet.semester.year} {wallet.semester.semester}</td>
              <td>{wallet.sum_balance}</td>
              <td>{wallet.sum_vouchers}</td>
              <td>{wallet.sum_vouchers_used}</td>
              <td>{wallet.count_users}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ]
  }

  render() {
    console.log(this.props.stats.get('data'))
    return (
      <div>
        <h1>Vouchers</h1>
        <Loader
          isLoading={this.props.stats.get('isLoading')}
          error={this.props.stats.get('error')}
          isEmpty={!this.props.stats.get('data')}>
          No voucher data is registered.
        </Loader>
        {this.renderStats()}
      </div>
    )
  }
}
