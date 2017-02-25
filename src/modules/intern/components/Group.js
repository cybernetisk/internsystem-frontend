import React from 'react'
import {Link} from 'react-router'
import {connect} from 'nuclear-js-react-addons'

import * as actions from '../actions'
import getters from '../getters'
import {userDetails, isLoggedIn} from '../../auth/getters'
import AddIntern from './AddIntern'

import InternService from '../services/InternService'

@connect(props => ({
  group: getters.group,
  roles: getters.roles,
  interns: getters.internroles,
  userDetails,
  isLoggedIn
}))
export  default class Group extends React.Component {

  constructor(props) {
    super(props)
    this.state = {isEditing: false, isDeleted: false}
  }

  componentDidMount() {
    let groupId = this.props.params.groupId
    actions.getGroup(groupId)
    actions.getRolesInGroup(groupId)
    actions.getInternsInGroup(groupId)
  }

  renderInterns() {
    return (
      <div><h2>Interns</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Username</th>
              <th>Semesters</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {this.props.interns.get('data').toJS().map((intern) => {
              return (
                <tr key={intern.id}>
                  <td>{intern.intern.user.username}</td>
                  <td>
                    <ul>
                      {intern.semesters.map(semester => {
                        return(
                          <li key={semester.id}>{this.renderSemester(semester)}</li>
                        )
                      })
                      }
                    </ul>
                  </td>
                  <td>{intern.role.name}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }

  renderSemester(semester) {
    if (semester) {
      return (<div>{semester.year} {semester.semester}</div>)
    } else {
      return (<div>Unknown</div>)
    }
  }

  renderGroup(group) {
    return (
      <div>
        <h1>{group.name}</h1>
        <dl>
          <dt>Name:</dt>
          <dd>{group.name}</dd>
          <dt>Leader:</dt>
          <dd><Link to={`/intern/interns/${group.leader.id}`}>{group.leader.realname}</Link></dd>
          <dt>Roles:</dt>
          <dd>
            <ul>
              {this.props.roles.get('data').toJS().map((role) => {

                  return (
                    <li key={role.id}><Link to={`/intern/roles/${role.id}`}>{role.name}</Link></li>
                  )
                }
              )}
            </ul>
          </dd>
          <dt>Description:</dt>
          <dd>{group.description}</dd>
        </dl>
      </div>
    )
  }

  renderNormal() {
    return (
      <div>
        {this.renderGroup(this.props.group.get('data').toJS())}
        <AddIntern/>
        {this.renderInterns()}
      </div>
    )
  }

  render() {
    if (!this.props.isLoggedIn) {
      return (
        <h1>Not logged in! Please login!</h1>
      )
    }
    if (this.props.roles.get('isLoading')) {
      return (<h1>Waiting</h1>)
    } else if (this.props.group.get('isLoading')) {
      return (<h1>Waiting</h1>)
    } else if (this.props.interns.get('isLoading')) {
      return (<h1>Waiting</h1>)
    } else {
      return this.renderNormal()

    }
  }
}
