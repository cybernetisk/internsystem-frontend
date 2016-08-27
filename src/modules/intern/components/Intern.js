import React from 'react'

import {Link} from 'react-router'
import {connect} from 'nuclear-js-react-addons'
import {Col, Row} from 'react-bootstrap'

import * as actions from '../actions'

import getters from '../getters'
import {userDetails, isLoggedIn} from '../../auth/getters'

import InternService from '../services/InternService'

@connect(props => ({
  interns: getters.interns,
  roles: getters.roles,
  internroles: getters.internroles,
  uio_cards: getters.uio_cards,
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
    actions.getCardsForIntern(internId)
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
      <table className="table table-responsive table-bordered">
        <thead>
          <tr>
            <th>Role</th>
            <th>Description</th>
            <th>Groups</th>
          </tr>
        </thead>
        <tbody>
        {roles.map(role => {
          return (
            <tr key={role.role.id}>
              <td>
                <Link to={`/intern/roles/${role.role.id}`}>{role.role.name}</Link>
              </td>
              <td>{role.role.description}</td>
              <td>
                <ul>
                  {role.role.groups.map(group => {
                    return (
                      <li key={group.id}>
                        {group.name}</li>
                    )
                  })}
                </ul>
              </td>
            </tr>
          )
        })}</tbody>
      </table>)
  }

  renderLogs(logs) {
    return (
      <table className="table table-responsive table-bordered">
        <thead>
          <tr>
            <th>Time</th>
            <th>Editor</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
        {logs.map((log) => {
            return (
              <tr key={log.id}>
                <td>{log.time}</td>
                <td>{log.changed_by.username}</td>
                <td>{log.description}</td>
              </tr>
            )
          }
        )}
        </tbody>
      </table>
    )
  }

  renderCards() {
    return (
      <table className="table table-bordered">
        <thead>
          <tr>k
            <th>Card_Number</th>
            <th>Disabled</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
        {this.props.uio_cards.get('data').toJS().map((card) => {
            return (
              <tr key={card.id}>
                <td>{card.card_number}</td>
                <td>{card.disabled}</td>
                <td>{card.comment}</td>
              </tr>
            )
          }
        )}
        </tbody>

      </table>
    )

  }

  renderNormal() {
    var intern = this.props.interns.get('data').toJS()
    return (
      <div>
        <Row>
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
        </Row>
        <Row>
          <Col md={4}><h2>Roles</h2> {this.renderRoles(intern.roles)}</Col>
          <Col md={4}><h2>Logs</h2> {this.renderLogs(intern.log)}</Col>
          <Col md={4}><h2>Cards</h2>{this.renderCards()}</Col>
        </Row>
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
    if (!this.props.uio_cards.get('data')) {
      return (<h1>Still loacing...</h1>)
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
