import React from 'react'
import { Link } from 'react-router'
import { connect } from 'nuclear-js-react-addons'
import getters from '../getters'
import * as actions from '../actions'

import Loader from '../../../components/Loader'

import { isLoggedIn } from '../../auth/getters'


@connect(props => ({
  isLoggedIn,
  stats: getters.stats
}))
export default class Stats extends React.Component {
  componentDidMount() {
    actions.getStats()
  }

  renderList() {
    if (!this.props.stats.get('data')) {
      return
    }
    var normal = 0
    var lifetime = 0
    var honorary = 0

    let mylist = this.props.stats.get('data').toList().toJS()
    var i
    for(i = 0; i < mylist.length; i++){
      normal += mylist[i].normal
      lifetime += mylist[i].lifetime
      honorary += mylist[i].honorary
    }

    return (
      <table className="table-responsive table">
        <thead>
          <tr>
            <th>Semester</th>
            <th>Semester members</th>
            <th>Lifetime members</th>
            <th>Honorary members</th>
          </tr>
        </thead>
        <tbody>
        {mylist.map((stats) => (
          <tr key={stats.id}>
            <td><Link to={`/member/semester/${stats.id}`}>{stats.semester}</Link></td>
            <td>{stats.normal}</td>
            <td>{stats.lifetime}</td>
            <td>{stats.honorary}</td>
          </tr>

        ))}
          <tr>
            <td>All</td>
            <td>{normal}</td>
            <td>{lifetime}</td>
            <td>{honorary}</td>
          </tr>
        </tbody>
      </table>
    )
  }

  render() {
    return (
      <div>
        <h1>Members</h1>
        <Loader
          isLoading={this.props.stats.get('isLoading')}
          error={this.props.stats.get('error')}
          isEmpty={!this.props.stats.get('data')}
        >
          No semesters registered!
        </Loader>
        {this.renderList()}
      </div>
    )

  }

}
