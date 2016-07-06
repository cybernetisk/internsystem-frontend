import React from 'react'
import { Link } from 'react-router'
import {connect} from 'nuclear-js-react-addons'
import getters from '../getters'
import * as actions from '../actions'

import { userDetails, isLoggedIn } from '../../auth/getters';

@connect(props => ({
  groups: getters.groups,
  userDetails,
  isLoggedIn
}))
export  default class Groups extends React.Component {

  constructor(props) {
    super(props)
    actions.getGroups()
  }

  componentDidMount() {
  }

  renderTable() {
    return (
      <table className="table table-responsive">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Leader</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {this.props.groups.get('data').get('results').toJS().map((group) => {
            return (
              <tr key={group.id}>
                <td>{group.id}</td>
                <td><Link to={`/intern/groups/${group.id}`}>{group.name}</Link></td>
                <td><Link to={`/intern/interns/${group.leader.id}`}>{group.leader.realname}</Link></td>
                <td>{group.description}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }

  render() {
    if (!this.props.isLoggedIn) {
      return (
        <h1>Not logged in! Please login!</h1>
      )
    }
    
    if(!this.props.groups.get('data')) {
      return (<div>Doh!</div>)
    }
    return this.renderTable()
  }
}
