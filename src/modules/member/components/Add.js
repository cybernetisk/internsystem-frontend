import React from "react"
import { connect } from "react-redux"
import { getIsLoggedIn } from "../../auth/selectors"
import * as actions from "../actions"
import MemberService from "../services/MemberService"
import List from "./List"

@connect((state) => ({
  isLoggedIn: getIsLoggedIn(state),
}))
export default class Add extends React.Component {
  constructor(props) {
    super(props)

    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handleLifetimeChange = this.handleLifetimeChange.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.state = {
      name: "",
      email: "",
      lifetime: false,
    }
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value })
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value })
  }

  handleLifetimeChange(e) {
    this.setState({ lifetime: e.target.checked })
  }

  componentDidMount() {
    actions.getMemberList(1, 10, "-date_joined")
  }

  handleSubmit(e) {
    e.preventDefault()
    const name = this.state.name
    const email = this.state.email
    const lifetime = this.state.lifetime
    MemberService.registerMember(name, email, lifetime).then(
      () => {
        actions.getMemberList(1, 10, "-date_joined")
        this.setState({
          isSending: false,
          name: "",
          email: "",
          lifetime: false,
        })
      },
      (error) => {
        alert(error.responseText)
      },
    )
  }

  renderAddForm() {
    return (
      <div className="panel-body">
        <form className="form-inline" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={this.state.name}
              placeholder="Required"
              onChange={this.handleNameChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              name="email"
              value={this.state.email}
              placeholder="Optional"
              onChange={this.handleEmailChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              className="form-control btn-success"
              value="Add member"
            />
          </div>
        </form>
      </div>
    )
  }

  renderNewlyMembers() {
    return <List switcher={false} />
  }

  render() {
    console.debug(this.props.isLoggedIn)
    if (!this.props.isLoggedIn) {
      return <h1>You haven't logged in! Please login!</h1>
    }
    return (
      <div className="panel panel-default">
        <div className="panel-heading">Add member</div>
        <p className="lead">
          If you don't have access to add members and should have, go to #it on
          slack
        </p>
        {this.renderAddForm()}
        <h2>Recent members:</h2>
        {this.renderNewlyMembers()}
      </div>
    )
  }
}
