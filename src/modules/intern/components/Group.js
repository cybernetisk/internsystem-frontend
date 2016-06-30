import React from 'react'
import { Link } from 'react-router'
import { connect } from 'nuclear-js-react-addons'

import * as actions from '../actions'
import getters from '../getters'
import {userDetails, isLoggedIn} from '../../auth/getters'

@connect(props => ({
  group: getters.group,
  roles: getters.roles,
  userDetails,
  isLoggedIn
}))
export  default class Group extends React.Component {

  constructor(props) {
    super(props)
    this.handleEdit = this.handleEdit.bind(this)
    this.abortEdit = this.abortEdit.bind(this)
    this.saveEdit = this.saveEdit.bind(this)
    this.addMember = this.addMember.bind(this)

    let groupId = this.props.params.groupId
    actions.getGroup(groupId)
    actions.getRolesInGroup(groupId)

    this.state = {isEditing: false, isDeleted: false}
  }


  handleEdit(e) {
    if (this.state.isEditing) {
      this.setState({isEditing: false})
    } else {
      this.setState({isEditing: true})
    }
  }

  abortEdit(e) {
    e.preventDefault()
    this.setState({
      isEditing: false
    })
  }

  saveEdit(e) {
    //TODO: write code to update group
  }

  addMember(e) {
    //TODO: Write some request to do this
  }

  renderEdit() {
    //TODO: how should this look

  }

  renderGroup(group){
    return(
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
                return(
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
    //TODO: How should this look.
    return this.renderGroup(this.props.group.get('data').toJS())
  }

  render() {
    //TODO: Find out how to render this
    if (!this.props.roles.get('data') & !this.props.group.get('data')) {
      return (<h1>Waiting</h1>)
    } else {
      if (this.state.isEditing) {
        return this.renderEdit()
      } else {
        return this.renderNormal()
      }
    }
  }
}
