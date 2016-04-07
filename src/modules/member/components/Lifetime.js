import React from 'react'
import { Link } from 'react-router'
import { connect } from 'nuclear-js-react-addons'
import getters from '../getters'
import * as actions from '../actions'

import List from './List'

import Loader from '../../../components/Loader'

import { isLoggedIn } from '../../auth/getters'


@connect(props => ({
  isLoggedIn,
  member: getters.members
}))
export default class Lifetime extends React.Component {
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
