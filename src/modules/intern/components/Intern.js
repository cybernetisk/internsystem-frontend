import { connect } from "nuclear-js-react-addons-chefsplate"
import React from "react"
import { Col, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import { isLoggedIn, userDetails } from "../../auth/getters"
import * as actions from "../actions"
import * as getters from "../getters"
import InternService from "../services/InternService"

export default
@connect(() => ({
  interns: getters.interns,
  roles: getters.roles,
  internroles: getters.internroles,
  uioCards: getters.uioCards,
  userDetails,
  isLoggedIn,
}))
class Intern extends React.Component {
  constructor(props) {
    super(props)
    this.handleRoleChange = this.handleRoleChange.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleCardNumberChange = this.handleCardNumberChange.bind(this)
    this.handleComments = this.handleComments.bind(this)
    this.addRole = this.addRole.bind(this)
    this.addCard = this.addCard.bind(this)
    this.saveComment = this.saveComment.bind(this)
    this.removeRole = this.removeRole.bind(this)
    this.state = {
      isEditing: false,
      isDeleted: false,
      isLoaded: false,
      cardnumber: "",
      roleId: -1,
      isSending: false,
      username: "",
      comments: "",
    }
  }

  componentDidMount() {
    const userId = this.props.match.params.userId
    actions.getInternForUser(userId)
    actions.getRoles()
    actions.getCardsForUser(userId)
  }

  handleEdit() {
    if (!this.state.isEditing) {
      this.setState({ isEditing: true })
    } else {
      this.setState({ isEditing: false })
    }
  }

  addCard(e) {
    e.preventDefault()
    if (this.state.isSending) {
      return
    }
    this.setState({ isSending: true })
    const userid = this.props.interns.get("data").toJS()[0].user.id
    InternService.addCardToUser(userid, this.state.cardnumber).then(
      () => {
        actions.getCardsForUser(this.props.match.params.userId)
        this.setState({
          cardnumber: "",
          isSending: false,
        })
      },
      error => {
        alert(error.responseText)
        this.setState({ isSending: false })
      },
    )
  }

  addRole(e) {
    e.preventDefault()
    if (this.state.isSending) {
      return
    }
    const username = this.props.interns.get("data").toJS()[0].user.username
    this.setState({ isSending: true })
    InternService.addRoleToIntern(username, this.state.roleId).then(
      () => {
        actions.getInternForUser(this.props.match.params.userId)
        this.setState({
          isSending: false,
          roleId: -1,
        })
      },
      error => {
        alert(error.responseText)
        this.setState({ isSending: false })
      },
    )
  }

  renderAddRole() {
    return (
      <div>
        {this.renderRoleSelector()}
        <button
          type="button"
          className="btn btn-default"
          onClick={this.addRole}
        >
          Add role
        </button>
      </div>
    )
  }

  handleRoleChange(e) {
    this.setState({ roleId: e.target.value })
  }

  renderRoleSelector() {
    return (
      <select
        id="role-sel"
        className="form-control"
        value={this.state.roleId}
        onChange={this.handleRoleChange}
      >
        <option value={-1} disabled>
          Select a value
        </option>
        {this.props.roles
          .get("data")
          .toJS()
          .map(role => {
            return (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            )
          })}
      </select>
    )
  }

  handleCardNumberChange(e) {
    this.setState({ cardnumber: e.target.value })
  }

  renderAddCard() {
    return (
      <form className="form-inline" onSubmit={this.addCard}>
        <input
          type="text"
          name="cardnumber"
          value={this.state.cardnumber}
          placeholder="Card number"
          onChange={this.handleCardNumberChange}
          className="form-control"
        />
        <input
          type="submit"
          className="form-control btn-success"
          value="Add Card"
        />
      </form>
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map(role => (
            <tr key={role.role.id}>
              <td>
                <Link to={`/intern/roles/${role.role.id}`}>
                  {role.role.name}
                </Link>
              </td>
              <td>{role.role.description}</td>
              <td>
                <ul>
                  {role.role.groups.map(group => {
                    return <li key={group.id}>{group.name}</li>
                  })}
                </ul>
              </td>
              <th>
                <button
                  type="button"
                  value={role.id}
                  className="btn btn-default"
                  onClick={this.removeRole}
                >
                  Delete
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  removeRole(e) {
    if (confirm("Are you sure you want to remove that role?")) {
      InternService.removeRoleFromIntern(e.target.value).then(() => {
        actions.getIntern(this.props.match.params.internId)
      }),
        error => {
          alert(error.responseText)
        }
    }
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
          {logs.map(log => (
            <tr key={log.id}>
              <td>{log.time}</td>
              <td>{log.changed_by.username}</td>
              <td>{log.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  renderCards() {
    let add = ""
    if (this.state.isEditing) {
      add = this.renderAddCard()
    }
    return (
      <div>
        <h2>Cards</h2>
        {add}
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Card_Number</th>
              <th>Disabled</th>
              <th>Comments</th>
            </tr>
          </thead>
          <tbody>
            {this.props.uioCards
              .get("data")
              .toJS()
              .map(card => (
                <tr key={card.id}>
                  <td>{card.card_number}</td>
                  <td>{card.disabled}</td>
                  <td>{card.comment}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    )
  }

  saveComment(e) {
    e.preventDefault()
    InternService.addComment(
      this.props.match.params.internId,
      this.state.comments,
    ).then(
      () => {
        actions.getIntern(this.props.match.params.internId)
        this.setState({
          isEditing: false,
        })
      },
      error => {
        alert(error.responseText)
      },
    )
  }

  handleComments(e) {
    this.setState({ comments: e.target.value })
  }

  addComment(intern) {
    return (
      <form onSubmit={this.saveComment}>
        <textarea
          name="comments"
          value={intern.comments}
          onChange={this.handleComments}
          className="form-control"
        />
        <input type="submit" className="btn btn-default" />
      </form>
    )
  }

  renderIntern(intern) {
    let commentField = intern.comments
    if (this.state.isEditing) {
      commentField = this.addComment(intern)
    }
    return (
      <div>
        <h1>{intern.user.realname}</h1>
        <dl>
          <dt>Name:</dt>
          <dd>{intern.user.realname}</dd>
          <dt>Mail:</dt>
          <dd>{this.renderMail(intern.user.email)}</dd>
          <dt>Comments:</dt>
          <dd>{commentField}</dd>
        </dl>
      </div>
    )
  }

  renderEditButton() {
    if (this.state.isEditing) {
      return (
        <button
          type="button"
          className="btn btn-default"
          onClick={this.handleEdit}
        >
          Cancel
        </button>
      )
    } else {
      return (
        <button
          type="button"
          className="btn btn-default"
          onClick={this.handleEdit}
        >
          Edit
        </button>
      )
    }
  }

  renderNormal() {
    const intern = this.props.interns.get("data").toJS()[0]
    console.log(intern)
    let addRole = ""
    if (this.state.isEditing) {
      addRole = this.renderAddRole()
    }
    return (
      <div>
        <Row>
          <Col md={8}>
            {this.renderIntern(intern)}
            {this.renderEditButton()}
          </Col>
          <Col md={4}>{this.renderCards()}</Col>
        </Row>
        <Row>
          <Col md={6}>
            <h2>Roles</h2> {addRole} {this.renderRoles(intern.roles)}
          </Col>
          <Col md={6}>
            <h2>Logs</h2> {this.renderLogs(intern.log)}
          </Col>
        </Row>
      </div>
    )
  }

  render() {
    if (!this.props.isLoggedIn) {
      return <h1>Not logged in! Please login!</h1>
    }
    if (!this.props.interns.get("data")) {
      return <h1>Loading...</h1>
    }
    if (!this.props.uioCards.get("data")) {
      return <h1>Still loading...</h1>
    }

    if (this.state.isDeleted) {
      return (
        <div>
          <h1>Intern deleted!</h1>
          <Link to="/intern">Go back to overview</Link>
        </div>
      )
    }
    return this.renderNormal()
  }

  renderMail(mail) {
    if (mail) {
      return mail
    } else {
      return "No mail registered."
    }
  }
}
