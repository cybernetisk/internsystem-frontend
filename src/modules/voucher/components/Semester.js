import React from 'react'
import {connect} from 'nuclear-js-react-addons'

import getters from '../getters'
import * as actions from '../actions'

import Loader from '../../../components/Loader'

const ARROW_UP = '&#9652;';
const ARROW_DOWN = '&#9662;';

const DESCENDING = '-';
const USER = 'user';
const BALANCE = 'cached_balance';
const HOURS = 'cached_hours';
const VOUCHER = 'cached_vouchers';
const VOUCHERS_USED = 'cached_vouchers_used';

const DESC_USER = DESCENDING + USER;


@connect(props => ({
  wallets: getters.wallets,
  semester: getters.current_semester,
}))
export default class Semester extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortBy: USER
    };

  }
  componentDidMount() {
    setTimeout(() => {
      actions.fetchWallets({semester: this.props.params.semesterId, ordering: this.state.sortBy})
      actions.setActiveSemester(this.props.params.semesterId)
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.semesterId != this.props.params.semesterId) {
      actions.fetchWallets({semester: nextProps.params.semesterId})
      actions.setActiveSemester(nextProps.params.semesterId)
    }
  }

  changeOrder(criteria) {
      this.setState({sortBy: this.state.sortBy === criteria ? DESCENDING + criteria : criteria},
      	actions.fetchWallets({semester: this.props.params.semesterId, ordering: this.state.sortBy}));
  }

  renderWallets() {

    if (!this.props.wallets.get('data')) {
      return
    }

    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th onClick={() => this.changeOrder(USER)}>Person</th>
            <th onClick={() => this.changeOrder(BALANCE)}>Balance</th>
            <th onClick={() => this.changeOrder(HOURS)}>Hours tracked</th>
	    <th onClick={() => this.changeOrder(VOUCHER)}>Vouchers earned</th>
	    <th onClick={() => this.changeOrder(VOUCHERS_USED)}>Vouchers used</th>
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

      console

    return (
      <div>
        <h2>{semester}</h2>
        <Loader
          isLoading={this.props.wallets.get('isLoading')}
          error={this.props.wallets.get('error')}
          isEmpty={!this.props.wallets.get('data')}
        >
          No semester data is registered.
        </Loader>
        {this.renderWallets()}
      </div>
    )
  }
}
