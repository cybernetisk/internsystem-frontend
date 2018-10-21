import React from 'react'

import { Link } from 'react-router-dom'
import {connect} from 'nuclear-js-react-addons-chefsplate'

import * as actions from '../actions'
import * as getters from '../getters'

import { isLoggedIn } from '../../auth/getters'

export default
@connect(props =>({
  role: getters.roles,
  interns: getters.internList,
  isLoggedIn
}))
class Role extends React.Component {

  constructor(props){
    super(props)
  }

  componentDidMount(){
    var roleId = this.props.match.params.roleId
    actions.getRole(roleId)
    actions.getInternInRoles(roleId)
  }

  render() {
    if (!this.props.isLoggedIn) {
      return (
        <h1>Not logged in! Please login!</h1>
      )
    }
    return (
      <h1>Not implemented yet</h1>
    )
  }
}
