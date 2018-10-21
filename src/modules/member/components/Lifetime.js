import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'nuclear-js-react-addons-chefsplate'
import * as getters from '../getters'
import * as actions from '../actions'

import List from './List'

import Loader from '../../../components/Loader'

import { isLoggedIn } from '../../auth/getters'

export default
@connect(props => ({
  isLoggedIn,
  member: getters.members
}))
class Lifetime extends React.Component {
  componentDidMount() {
    actions.getLifetimeMember(1,50)
  }

  render() {
    return (
      <div>
        <h1>Lifetime members</h1>
        <List switcher={true} lifetime={true} />
      </div>
    )

  }

}
