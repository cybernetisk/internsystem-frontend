import React from 'react'
import { Link } from 'react-router'
import { connect } from 'nuclear-js-react-addons'

import getters from '../getters'
import * as actions from '../actions'

import Loader from '../../../components/Loader'
import NewWorkLog from './NewWorkLog'

@connect(props => ({
  worklogs: getters.worklogs,
}))
export default class List extends React.Component {
  componentDidMount() {
    actions.fetchWorkLogs(1)
  }

  renderWorkLogs() {
    if (!this.props.worklogs.get('data')) {
      return
    }

    return (
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Date worked</th>
              <th>Person</th>
              <th>Work group</th>
              <th>Hours</th>
              <th>Current balance</th>
              <th>Comment</th>
            </tr>
          </thead>
          <tbody>
            {this.props.worklogs.get('data').get('results').toJS().map((worklog) => (
              <tr key={worklog.id}>
                <td>{worklog.date_worked}</td>
                <td>{worklog.wallet.user.username} ({worklog.wallet.user.realname})</td>
                <td>{worklog.work_group}</td>
                <td>{worklog.hours}</td>
                <td>{worklog.wallet.cached_balance}</td>
                <td>{worklog.comment}</td>
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
        <h1>Vouchers - work logs</h1>
        <p>
          This is currently an experimental feature -
          see <a href="http://bong.cyb.no/">bong.cyb.no</a> for the real list
        </p>
        <NewWorkLog />
        <Loader
          isLoading={this.props.worklogs.get('isLoading')}
          error={this.props.worklogs.get('error')}
          isEmpty={!this.props.worklogs.get('data')}>
          No work data is registered.
        </Loader>
        {this.renderWorkLogs()}
      </div>
    )
  }
}
