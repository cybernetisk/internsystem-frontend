import React from 'react'
import { Link } from 'react-router'
import { connect } from 'nuclear-js-react-addons'
import moment from '../../../moment'
import getters from '../getters'
import * as actions from '../actions'

import Pagination from '../../../components/Pagination'
import Loader from '../../../components/Loader'

import { userDetails, isLoggedIn } from '../../auth/getters'

@connect(props => ({
  members: getters.members,
  userDetails,
  isLoggedIn
}))
export default class List extends React.Component {

  constructor(props) {
    super(props)
    this.handlePageChange = this.handlePageChange.bind(this)
  }

  PropTypes = {
    switcher: React.PropTypes.bool,
    semId: React.PropTypes.number,
    semester: React.PropTypes.bool,
    lifetime: React.PropTypes.bool,
  }

  handlePageChange(newPage) {
    if(this.props.lifetime){
      actions.getLifetimeMember(newPage, 50)
    }
    else if (this.props.semId != null) {
      actions.getSemMemberList(this.props.semId, newPage, 50)
    } else {
      actions.getMemberList(newPage)
    }
  }


  renderDate(date) {
    return moment(date).format('dddd DD. MMM YYYY HH:mm')
  }

  renderLifetime(lifetime) {

    if (lifetime == true) {
      return 'Yes'
    } else {
      return 'No'
    }
  }

  renderList() {
    return (
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Date joined</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {this.props.members.get('data').get('results').toJS().map((member) => {
            return (
              <tr key={member.id}>
                <td>{member.id}</td>
                <td><Link to={`/member/${member.id}`}>{member.name}</Link></td>
                <td>{this.renderDate(member.date_joined)}</td>
                <td>{member.email}</td>
              </tr>)
          })}
        </tbody>
      </table>
    )
  }

  renderPageSwitcher() {
    if (this.props.members.get('data').get('pages') == 1) {
      return
    } else if (!this.props.switcher) {
      return
    } else {
      return (
        <Pagination
          active={this.props.members.get('data').get('page')}
          pages={this.props.members.get('data').get('pages')}
          onChange={this.handlePageChange}
        />
      )
    }
  }

  render() {
    //TODO: fix null check and better error message.
    if (!this.props.isLoggedIn) {
      return (
        <h1>You haven't logged in! Please login!</h1>
      )
    }
    if (!this.props.members.get('data')) {
      return (<div><h1>Something went wrong. Contact #it on slack</h1></div>)

    } else {
      return (
        <div>
          {this.renderList()}
          {this.renderPageSwitcher()}
        </div>)
    }
  }
}
