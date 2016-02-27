import React from 'react'
import { Link } from 'react-router'
import { connect } from 'nuclear-js-react-addons'
import moment from '../../../moment'

import {api} from '../../../api'

import getters from '../getters'
import * as actions from '../actions'
import { userDetails, isLoggedIn } from '../../auth/getters'

import PageLoader from '../../../components/PageLoader'
import MemberService from '../services/MemberService'

@connect(props => ({
  member: getters.member,
  userDetails,
  isLoggedIn
}))
export default class Member extends React.Component {

  constructor(props) {
    super(props)
    this.handleEdit = this.handleEdit.bind(this)
    this.abortEdit = this.abortEdit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.saveEdit = this.saveEdit.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handleHonoraryChange = this.handleHonoraryChange.bind(this)
    this.handleLifetimeChange = this.handleLifetimeChange.bind(this)
    this.handleComments = this.handleComments.bind(this)
    this.state = {isEditing: false, isDeleted: false}
  }

  componentDidMount() {
    let memberId = this.props.params.memberId
    MemberService.getMember(memberId).then(result => {
        actions.getMember(memberId)
        this.setState({
          id: result.id,
          name: result.name,
          email: result.email,
          date_joined: result.date_joined,
          lifetime: result.lifetime,
          honorary: result.honorary,
          last_edited_by: result.last_edited_by.realname,
          semester: result.semester.semester,
          year: result.semester.year,
          seller: result.seller.realname,
          comments: result.comments
        })
      }, error => {
        alert(error.responseText)
      }
    )
  }


  render() {

    if (!this.props.isLoggedIn) {
      return (
        <h1>Not logged in! Please login!</h1>
      )
    }

    if (this.state.isDeleted) {
      return (
        <div>
          <h1>Member is deleted!</h1>
          <Link to="/member">Go back to overview</Link>
        </div>
      )
    }

    if (this.state.isEditing) {
      return this.renderEdit()
    } else {
      return this.renderNormal()
    }
  }

  handleNameChange(e) {
    this.setState({name: e.target.value})
  }

  handleEmailChange(e) {
    this.setState({email: e.target.value})
  }

  handleLifetimeChange(e) {
    this.setState({lifetime: e.target.checked})
  }

  handleHonoraryChange(e) {
    this.setState({honorary: e.target.checked})
  }

  handleComments(e) {
    this.setState({comments: e.target.value})
  }

  renderEdit() {
    return (
      <div>
        <button type="button" className="btn btn-default" onClick={this.abortEdit}>Abort</button>
        <button type="button" className="btn btn-default" onClick={this.saveEdit}>Save</button>
        <div className="panel-body">
          <form onSubmit={this.saveEdit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="'text" name="'name" value={this.state.name}
                onChange={this.handleNameChange} className="form-control"
              />
              <label htmlFor="email">Email:</label>
              <input type="text" name="email" value={this.state.email}
                onChange={this.handleEmailChange} className="form-control"
              />
              <label htmlFor="comments">Comments:</label>
              <textarea
                name="comments" value={this.state.comments} rows="4" onChange={this.handleComments}
                className="form-control"
              />
              <label htmlFor="lifetime">Lifetime</label>
              {this.renderCheckbox('lifetime', this.state.lifetime, this.handleLifetimeChange)}

              <label htmlFor="honorary">Honorary</label>
              {this.renderCheckbox('honorary', this.state.honorary, this.handleHonoraryChange)}

            </div>
          </form>
        </div>
      </div>
    )
  }

  renderCheckbox(name, value, func) {
    if (value) {
      return <input type="checkbox" name={name} checked="checked" onChange={func}/>
    } else {
      return <input type="checkbox" name={name} onChange={func}/>
    }
  }

  abortEdit(e) {
    e.preventDefault();
    this.setState({
      isEditing: false
    })
  }

  saveEdit(e) {
    e.preventDefault()
    MemberService.updateMember(this.state.id, this.state.name, this.state.email,
      this.state.lifetime, this.state.honorary, this.state.comments).then(result => {
      actions.updateMember(this.state.id)
      this.setState({
        id: result.id,
        name: result.name,
        email: result.email,
        lifetime: result.lifetime,
        honorary: result.honorary,
        comments: result.comments
      })
    }, error => {
      alert(error.responseText)
    })
    this.setState({isEditing: false,})
  }


  renderNormal() {
    return (
      <div>
        <h1>{this.state.name}</h1>
        <dl>
          <dt>Name:</dt>
          <dd>{this.state.name}</dd>
          <dt>Mail:</dt>
          <dd>{this.renderMail(this.state.email)}</dd>
          <dt>Joined:</dt>
          <dd>{moment(this.state.date_joined).format('DD.MMM YYYY')}</dd>
          <dt>Honorary member:</dt>
          <dd>{this.renderBoolean(this.state.honorary)}</dd>
          <dt>Lifetime member:</dt>
          <dd>{this.renderBoolean(this.state.lifetime)}</dd>
          <dt>Semester:</dt>
          <dd>{this.state.year} {this.state.semester}</dd>
          <dt>Seller:</dt>
          <dd>{this.state.seller}</dd>
          <dt>Last modified by:</dt>
          <dd>{this.state.last_edited_by}</dd>
          <dt>Comments:</dt>
          <dd>{this.state.comments}</dd>
        </dl>
        <button type="button" className="btn btn-default" onClick={this.handleEdit}>Edit</button>
        <button type="button" className="btn btn-default" onClick={this.handleDelete}>Delete</button>
      </div>
    )
  }

  handleEdit() {
    if (this.state.isEditing) {
      this.setState({isEditing: false})
    } else {
      this.setState({isEditing: true})
    }
  }

  handleDelete() {
    if (confirm('Are you sure you want to delete this member?')) {
      MemberService.removeMember(this.state.id).then(result => {
        actions.memberDeleted(this.state.id)
        this.setState({
          isDeleted: true
        })
      }, error => {
        alert(error.responseText)
      })
    }

  }


  renderMail(mail) {
    if (mail) {
      return mail
    } else {
      return 'No mail registered.'
    }
  }


  renderBoolean(bool) {
    if (bool) {
      return 'True'
    } else {
      return 'False'
    }
  }

}
