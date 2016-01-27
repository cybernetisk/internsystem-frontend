import React from 'react'
import {connect} from 'nuclear-js-react-addons'

import getters from '../getters'
import * as actions from '../actions'

import Loader from '../../../components/Loader'

@connect(props => ({
  wallets: getters.wallets,
  semester: getters.current_semester,
}))
export default class Semester extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      actions.fetchWallets({semester: this.props.params.semesterId})
      actions.setActiveSemester(this.props.params.semesterId)
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.semesterId != this.props.params.semesterId) {
      actions.fetchWallets({semester: nextProps.params.semesterId})
      actions.setActiveSemester(nextProps.params.semesterId)
    }
  }

  renderWallets() {
    if (!this.props.wallets.get('data')) {
      return
    }

    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Person</th>
            <th>Balance</th>
            <th>Hours tracked</th>
            <th>Vouchers earned</th>
            <th>Vouchers used</th>
          </tr>
        </thead>
        <tbody>
          {this.props.wallets.get('data').toJS().map((wallet) => (
            <tr key={wallet.id}>
              <td>{wallet.user.username} ({wallet.user.realname})</td>
              <td>{wallet.cached_balance}</td>
              <td>{wallet.cached_hours}</td>
              <td>{wallet.cached_vouchers}</td>
              <td>{wallet.cached_vouchers_used}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  render() {
    let semester = this.props.semester
      ? `Semester ${this.props.semester.get('year')} ${this.props.semester.get('semester')}`
      : 'Semester ??'

    return (
      <div>
        <h2>{semester}</h2>
        <Loader
          isLoading={this.props.wallets.get('isLoading')}
          error={this.props.wallets.get('error')}
          isEmpty={!this.props.wallets.get('data')}>
          No semester data is registered.
        </Loader>
        {this.renderWallets()}
      </div>
    )
  }
}
