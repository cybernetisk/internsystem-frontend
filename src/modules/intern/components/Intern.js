import React from 'react'

import { Link } from 'react-router'
import { connect } from 'nuclear-js-react-addons'

import actions from '../actions'

import getters from '../getters'
import {userDetails, isLoggedIn} from '../../auth/getters'

import InternService from '../services/InternService'

@connect(props => ({
  interns: getters.interns,
  userDetails,
  isLoggedIn
}))
export  default class Intern extends React.Component {
  constructor(props){
    super(props)
    this.handleEdit = this.handleEdit.bind(this)
    this.state = {isEditing: false, isDeleted: false}

  }
  componentDidMount(){
    let internId = this.props.params.internId
    InternService.getIntern(internId).then(result => {
      actions.getIntern(internId)
      this.setState({
        name: result.user.realname,
        user: result.user,
        semester: result.semester,
        active: result.active,
        comments: result.comments,
        cards: result.cards
      })
    }, error => {
      alert(error.responseText)
    })
  }
  handleEdit(e) {
    if(this.state.isEditing) {
      this.setState({isEditing: true})
    } else {
      this.setState({isEditing: false})
    }
  }

  renderEdit(){
    return (<div>
      <h1>Not implemented yet!</h1>
    </div>)
  }

  renderNormal(){
    return(
      <div>
        <h1>Not implmented yet!</h1>
      </div>
    )
  }

  render() {
    if(!this.props.isLoggedIn){
      return(
        <h1>Not logged in! Please login!</h1>
      )
    }

    if(this.state.isDeleted){
      return(
        <div>
          <h1>Intern deleted!</h1>
          <Link to="/intern">Go back to overview</Link>
        </div>
      )
    }
    if (this.state.isEditings){
      return this.renderEdit()
    } else {
      return this.renderNormal()
    }
  }
}
