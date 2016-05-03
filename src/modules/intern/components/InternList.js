import React from 'react'
import { Link } from 'react-router'
import { connect } from 'nuclear-js-react-addons'
import moment from '../../../moment'
import getters from '../getters'
import * as actions from '../actions'

import Pagination from '../../../components/Pagination'
import Loader from '../../../components/Loader'


import { userDetails, isLoggedIn } from '../../auth/getters'

@connect(props => ({
  userDetails,
  isLoggedIn,
  interns: getters.internList
}))
export default class InternList extends React.Component {
  constructor(props) {
    super(props)
    actions.getInterns(1, 50, '')
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
        {this.props.interns.get('data').get('results').toJS().map((intern) => {
          return (
            <tr key={intern.id}>
              <td><Link to={`/intern/interns/${intern.id}`}>{intern.user.realname}</Link></td>
              <td>
                <ul>{intern.roles.map((role) => {
                  return (<li key={role.id}>{role.name}</li>)
                })
                }</ul>
              </td>
              <td>{intern.comment}</td>
            </tr>)
        })}
        </tbody>
      </table>
    )
  }

  render() {
    if (!this.props.isLoggedIn) {
      return (
        <h1>You haven't logged in! Please login!</h1>
      )
    }
    if (!this.props.interns.get('data')) {
      return (<h1>There is no interns!</h1>)
    } else {

      return (<div>
          <Loader
            isLoading={this.props.interns.get('isLoading')}
            error={this.props.interns.get('error')}
            isEmpty={!this.props.interns.get('data')}
          >
            Loading list
          </Loader>
          {this.renderList()}
        </div>
      )
    }
  }

}
