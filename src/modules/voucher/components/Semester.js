import React from 'react'
import {connect} from 'nuclear-js-react-addons'

import getters from '../getters'
import * as actions from '../actions'

import Loader from '../../../components/Loader'

const ARROW_UP = '\u25B4';
const ARROW_DOWN = '\u25BE';
const UNSORTED = '\u25b8'; 
const DESCENDING = '-';
const USER = 'user';
const BALANCE = 'cached_balance';
const HOURS = 'cached_hours';
const VOUCHER = 'cached_vouchers';
const VOUCHERS_USED = 'cached_vouchers_used';

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
      this.state = {sortBy: this.state.sortBy === criteria ? DESCENDING + criteria : criteria};
      actions.fetchWallets({semester: this.props.params.semesterId, ordering: this.state.sortBy});
  }
  
  drawArrow(asc, dsc) {
	  switch(this.state.sortBy) {
		  case asc: return ARROW_UP;
		  case dsc: return ARROW_DOWN;
		  default: return UNSORTED;
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
            <th onClick={() => this.changeOrder(USER)}>Person {this.drawArrow(USER, DESCENDING + USER)}</th>
            <th onClick={() => this.changeOrder(BALANCE)}>Balance {this.drawArrow(BALANCE, DESCENDING + BALANCE)}</th>
            <th onClick={() => this.changeOrder(HOURS)}>Hours tracked {this.drawArrow(HOURS, DESCENDING + HOURS)}</th>
	    <th onClick={() => this.changeOrder(VOUCHER)}>Vouchers earned {this.drawArrow(VOUCHER, DESCENDING + VOUCHER)}</th>
	    <th onClick={() => this.changeOrder(VOUCHERS_USED)}>Vouchers used {this.drawArrow(VOUCHERS_USED, DESCENDING + VOUCHERS_USED)}</th>
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
