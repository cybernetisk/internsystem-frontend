import React from 'react'

import {Link} from 'react-router'
import {connect} from 'nuclear-js-react-addons'

import * as actions from '../actions'

import getters from '../getters'
import {userDetails, isLoggedIn} from '../../auth/getters'

import InternService from '../services/InternService'

@connect(props => ({
  interns: getters.interns,
  roles: getters.roles,
  userDetails,
  isLoggedIn
}))
export  default class Intern extends React.Component {
  constructor(props) {
    super(props)
    this.handleEdit = this.handleEdit.bind(this)
    this.state = {isEditing: false, isDeleted: false, isLoaded: false}

  }

  componentDidMount() {
    let internId = this.props.params.internId
    actions.getIntern(internId)
    actions.getRoles()
  }

  handleEdit(e) {
    if (this.state.isEditing) {
      this.setState({isEditing: true})
    } else {
      this.setState({isEditing: false})
    }
  }

  renderEdit() {
    return (<div>
      <h1>Not implemented yet!</h1>
    </div>)
  }

  renderRoles(roles) {
    return (
      <div>
        <ul>{roles.map(role => {
          return (
            <li key={role.role.id}><Link to={`/intern/roles/${role.role.id}`}>{role.role.name}</Link></li>

          )
        })}</ul>
      </div>)
  }

  renderNormal() {
    var intern = this.props.interns.get('data').toJS()
    return (
      <div>
        <h1>{intern.user.realname}</h1>
        <dl>
          <dt>Name:</dt>
          <dd>{intern.user.realname}</dd>
          <dt>Mail:</dt>
          <dd>{this.renderMail(intern.user.email)}</dd>
          <dt>Comments:</dt>
          <dd>{intern.comments}</dd>
        </dl>
        <button type="button" className="btn btn-default" onClick={this.handleEdit}>Edit</button>
        {this.renderRoles(intern.roles)}
      </div>

    )
  }

  render() {
    if (!this.props.isLoggedIn) {
      return (
        <h1>Not logged in! Please login!</h1>
      )
    }
    if (!this.props.interns.get('data')) {
      return (<h1>Loading...</h1>)
    }

    if (this.state.isDeleted) {
      return (
        <div>
          <h1>Intern deleted!</h1>
          <Link to="/intern">Go back to overview</Link>
        </div>
      )
    }
    if (this.state.isEditings) {
      return this.renderEdit()
    } else {
      return this.renderNormal()
    }
  }

  renderMail(mail) {
    if (mail) {
      return mail
    } else {
      return 'No mail registered.'
    }
  }
}
