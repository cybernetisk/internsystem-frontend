import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'nuclear-js-react-addons-chefsplate'
import moment from '../../../moment'
import * as getters from '../getters'
import * as actions from '../actions'

import Pagination from '../../../components/Pagination'
import Loader from '../../../components/Loader'


import { userDetails, isLoggedIn } from '../../auth/getters'

export default
@connect(props => ({
  userDetails,
  isLoggedIn,
  interns: getters.internList
}))
class InternList extends React.Component {
  constructor(props) {
    super(props)
    this.handlePageChange = this.handlePageChange.bind(this)
  }

  handlePageChange(newPage) {
      actions.getInterns(newPage, 50, null)
  }

  renderList() {
    return (
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Roles</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          {this.props.interns.get('data').get('results').toJS().map((intern) => (
            <tr key={intern.id}>
              <td><Link to={`/intern/interns/${intern.user.id}`}>{intern.user.username}</Link></td>
              <td>
                <ul>{intern.roles.map((role) => {
                  return (<li key={role.role.id}>{role.role.name}</li>)
                })
                }</ul>
              </td>
              <td>{intern.comment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  renderPageSwitcher() {
    if (this.props.interns.get('data').get('pages') == 1) {
      return
    } else {
      return (
        <Pagination
          active={this.props.interns.get('data').get('page')}
          pages={this.props.interns.get('data').get('pages')}
          onChange={this.handlePageChange}
        />
      )
    }
  }

  render() {
    if (!this.props.isLoggedIn) {
      return (
        <h1>You haven't logged in! Please login!</h1>
      )
    }

    if (this.props.interns.get('isLoading')) {
      return (
        <Loader
          isLoading={this.props.interns.get('isLoading')}
          error={this.props.interns.get('error')}
          isEmpty={!this.props.interns.get('data')}
        >
          <h2>Loading list</h2>
        </Loader>)
    }
    if (!this.props.interns.get('data')) {
      return (<h1>There is no interns!</h1>)
    } else {
      return (
        <div>
          {this.renderList()}
          {this.renderPageSwitcher()}
        </div>
      )
    }
  }

}
