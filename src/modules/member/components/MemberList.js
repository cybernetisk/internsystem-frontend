import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'nuclear-js-react-addons-chefsplate'
import moment from '../../../moment'
import * as getters from '../getters'
import * as actions from '../actions'

import Pagination from '../../../components/Pagination'
import Loader from '../../../components/Loader'

import List from './List'

import { userDetails, isLoggedIn } from '../../auth/getters'

export default
@connect(props => ({
  userDetails,
  isLoggedIn
}))
class MemberList extends React.Component {
  constructor(props) {
    super(props)
    actions.getMemberList(1, 50, 'date_joined')
  }

  render() {
    if (!this.props.isLoggedIn) {
      return (
        <h1>You haven't logged in! Please login!</h1>
      )
    }

    return (<div>
      <h1>Memberlist</h1>
      <List switcher={true}/>
    </div>)

  }

}
