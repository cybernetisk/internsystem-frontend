import React from 'react'
import { Link } from 'react-router'
import { connect } from 'nuclear-js-react-addons'
import moment from '../../../moment'
import getters from '../getters'
import * as actions from '../actions'

import Pagination from '../../../components/Pagination'
import Loader from '../../../components/Loader'

import List from './List'

import MemberService from '../services/MemberService'

import { userDetails, isLoggedIn } from '../../auth/getters'

@connect(props => ({
  members: getters.members,
  userDetails,
  isLoggedIn
}))
export default class Search extends React.Component {
  constructor(props) {
    super(props)
    this.handleSearch = this.handleSearch.bind(this)
    this.state = ({
      name: ''
    })
  }


  componentDidMount() {
    this.setState({
      name: '',
      isSending: false
    })
    actions.getMemberList(1, 10, 'name', '')
  }

  render() {
    if (!this.props.isLoggedIn) {
      return (
        <h1>You haven't logged in! Please login!</h1>
      )
    }
    return (
      <div>
        <h1>Search</h1>
        {this.renderSearchField()}
        <h2>Results</h2>
        <List switcher={false}/>
      </div>
    )
  }

  renderSearchField() {
    return (
      <form onSubmit={this.handleSearch}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={this.state.name}
            placeholder="Search..." onChange={this.handleSearch}
          />
        </div>
      </form>


    )
  }

  handleSearch(e) {
    e.preventDefault()
    this.state.name = e.target.value
    const search = this.state.name

    actions.getMemberList(1, 10, 'name', search)

  }

}
