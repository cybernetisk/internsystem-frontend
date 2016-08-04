import React from 'react'

import {Link} from 'react-router'
import {connect} from 'nuclear-js-react-addons'

import * as actions from '../actions'
import getters from '../getters'

import { isLoggedIn } from '../../auth/getters'

@connect(props =>({
  role: getters.roles,
  interns: getters.internList,
  isLoggedIn
}))
export  default class Role extends React.Component {

  constructor(props){
    super(props)
  }

  componentDidMount(){
    var roleId = this.props.params.roleId
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
      <h1>Not impl2emented yet</h1>
    )
  }
}
