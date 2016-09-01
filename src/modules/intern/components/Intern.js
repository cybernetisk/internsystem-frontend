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
    this.handleRoleChange = this.handleRoleChange.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.addRole = this.addRole.bind(this)
    this.state = {
      isEditing: false,
      isDeleted: false,
      isLoaded: false,
      cardnumber: '',
      roleId: -1,
      isSending: false,
      username: ''
    }

  }

  componentDidMount() {
    let internId = this.props.params.internId
    actions.getIntern(internId)
    actions.getRoles()
    actions.getCardsForIntern(internId)
  }

  handleEdit() {
    console.log(this.state.isEditing)
    if (!this.state.isEditing) {
      this.setState({isEditing: true})
    } else {
      this.setState({isEditing: false})
    }
  }

  addCard(e){

  }

  addRole(e) {
    if (this.state.isSending){
      return
    }
    let username = this.props.interns.get('data').toJS().user.username
    this.setState({isSending: true})
    InternService.addRoleToIntern(username, this.state.roleId).then(result => {
      actions.getIntern(this.props.params.internId)
      this.setState({
        isSending: false,
        roleId: -1,
      })
    }, error =>{
      alert(error.responseText)
      this.setState({isSending: false})
    })
  }

  renderAddRole(){

    return (
      <div>
        {this.renderRoleSelector()}
        <button type="button" className="btn btn-default" onClick={this.addRole}>Add role</button>
      </div>
    )
  }

  handleRoleChange(e) {
    console.log(e.target.value)
    this.setState({roleId: e.target.value})
  }

  renderRoleSelector() {
    return (
      <select id="role-sel" className="form-control" value={this.state.roleId} onChange={this.handleRoleChange}>
        <option value={-1} disabled>Select a value</option>
        {this.props.roles.get('data').toJS().map((role) => {
          return (
            <option key={role.id} value={role.id}>{role.name}</option>
          )
        })}
      </select>
    )
  }

  renderAddCard(){
    return (
      <form className="form-inline" onSubmit={this.addCard()}>
        <input type="text" name="cardnumber" value={this.state.cardnumber} placeholder="Card number"/>
        <input type="submit" className="form-control btn-success"/>
      </form>
    )
  }

  renderEdit() {
    var intern = this.props.interns.get('data').toJS()
    return (
      <div>
        <Row>
          {this.renderIntern(intern)}
          <button type="button" className="btn btn-default" onClick={this.handleEdit}>Cancel</button>
        </Row>
        <Row>
          <Col md={4}><h2>Roles</h2> {this.renderAddRole()} {this.renderRoles(intern.roles)}</Col>
          <Col md={4}><h2>Logs</h2> {this.renderLogs(intern.log)}</Col>
          <Col md={4}><h2>Cards</h2>{this.renderAddCard()} {this.renderCards()}</Col>
        </Row>
      </div>
    )
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
      <div>

        <table className="table table-bordered">
          <thead>
            <tr>
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
            )}
          )}
          </tbody>

        </table>
      </div>
    )

  }

  renderIntern(intern) {
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
      </div>
    )
  }

  renderNormal() {
    var intern = this.props.interns.get('data').toJS()
    return (
      <div>
        <Row>
          {this.renderIntern(intern)}
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
    if (this.state.isEditing) {
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
