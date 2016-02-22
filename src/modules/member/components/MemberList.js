import React from 'react'
import { Link } from 'react-router'
import { connect } from 'nuclear-js-react-addons'
import moment from '../../../moment'
import getters from '../getters'
import * as actions from '../actions'

import Pagination from '../../../components/Pagination'
import Loader from '../../../components/Loader'

import List from './List'

import { userDetails, isLoggedIn } from '../../auth/getters'

@connect(props => ({
  userDetails,
  isLoggedIn
}))
export default class MemberList extends React.Component {
  constructor(props) {
    super(props)
    actions.getMemberList(1, 50, 'date_joined')
  }

  render() {
    console.debug(this.props.isLoggedIn)
    if (!this.props.isLoggedIn) {
      return (
        <h1>You haven't logged in! Please login!</h1>
      )
    }

    return (<div>
      <h1>Memberlist</h1>
      <List/>
    </div>)

  }

}
