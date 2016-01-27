import React from 'react'
import { Link } from 'react-router'
import { connect } from 'nuclear-js-react-addons'
import moment from '../../../moment'

import getters from '../getters'
import * as actions from '../actions'

import Loader from '../../../components/Loader'
import NewWorkLog from './NewWorkLog'

import { isLoggedIn } from '../../auth/getters'

@connect(props => ({
  worklogs: getters.worklogs,
  isLoggedIn,
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
            {this.props.worklogs.get('data').get('results').toJS().map((worklog) => {
              let who = worklog.wallet.user.username
              if (worklog.wallet.user.realname) {
                who += ` (${worklog.wallet.user.realname})`
              }
              let time = moment(worklog.date_issued).format('YYYY-MM-DD HH:mm')
              let reg_by = worklog.issuing_user.username == worklog.wallet.user.username
                ? ''
                : `by ${worklog.issuing_user.username}`
              return (
                <tr key={worklog.id}>
                  <td>{worklog.date_worked}</td>
                  <td>{who}</td>
                  <td>{worklog.work_group}</td>
                  <td>{worklog.hours}</td>
                  <td>{worklog.wallet.cached_balance}</td>
                  <td>
                    {worklog.comment}
                    <div className="small text-muted">Registered {reg_by} {time}</div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <p>TODO: pagination (currently limited to 50 items)!</p>
      </div>
    )
  }

  renderNew() {
    if (this.props.isLoggedIn) {
      return (
        <NewWorkLog />
      )
    }

    return (
      <div className="alert alert-warning">You have to <Link to='auth.login'>log in</Link> to register
        work.</div>
    )
  }

  render() {
    return (
      <div>
        <h1>Vouchers - work logs</h1>
        <p>
          If you have any problems go
          to <a href="https://cybernetisk.slack.com/messages/webgruppa/details/">#webgruppa</a> on Slack
        </p>
        {this.renderNew()}
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
