import { connect } from "nuclear-js-react-addons-chefsplate"
import PropTypes from "prop-types"
import React from "react"
import { connect as reduxConnect } from "react-redux"
import { Link } from "react-router-dom"
import moment from "utils/moment"
import Pagination from "../../../components/Pagination"
import { getIsLoggedIn, getUserDetails } from "../../auth/selectors"
import * as actions from "../actions"
import * as getters from "../getters"

@connect(() => ({
  members: getters.members,
}))
@reduxConnect((state) => ({
  userDetails: getUserDetails(state),
  isLoggedIn: getIsLoggedIn(state),
}))
export default class List extends React.Component {
  constructor(props) {
    super(props)
    this.handlePageChange = this.handlePageChange.bind(this)
  }

  static propTypes = {
    switcher: PropTypes.bool,
    semId: PropTypes.number,
    semester: PropTypes.bool,
    lifetime: PropTypes.bool,
  }

  handlePageChange(newPage) {
    if (this.props.lifetime) {
      actions.getLifetimeMember(newPage, 50)
    } else if (this.props.semId != null) {
      actions.getSemMemberList(this.props.semId, newPage, 50)
    } else {
      actions.getMemberList(newPage)
    }
  }

  renderDate(date) {
    return moment(date).format("dddd DD. MMM YYYY HH:mm")
  }

  renderLifetime(lifetime) {
    if (lifetime == true) {
      return "Yes"
    } else {
      return "No"
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
          {this.props.members
            .get("data")
            .get("results")
            .toJS()
            .map((member) => {
              return (
                <tr key={member.id}>
                  <td>{member.id}</td>
                  <td>
                    <Link to={`/member/${member.id}`}>{member.name}</Link>
                  </td>
                  <td>{this.renderDate(member.date_joined)}</td>
                  <td>{member.email}</td>
                </tr>
              )
            })}
        </tbody>
      </table>
    )
  }

  renderPageSwitcher() {
    if (this.props.members.get("data").get("pages") == 1) {
      return
    } else if (!this.props.switcher) {
      return
    } else {
      return (
        <Pagination
          active={this.props.members.get("data").get("page")}
          pages={this.props.members.get("data").get("pages")}
          onChange={this.handlePageChange}
        />
      )
    }
  }

  render() {
    //TODO: fix null check and better error message.
    if (!this.props.isLoggedIn) {
      return <h1>You haven't logged in! Please login!</h1>
    }
    if (this.props.members.get("isLoading")) {
      return <h1>Loading...</h1>
    } else if (!this.props.members.get("data")) {
      return <h1>Can't find any members!</h1>
    } else if (this.props.members.get("error")) {
      return (
        <h1>
          Something went wrong. Please contact #it on{" "}
          <a href="https://cybernetisk.slack.com">Slack</a>
        </h1>
      )
    } else {
      return (
        <div>
          {this.renderList()}
          {this.renderPageSwitcher()}
        </div>
      )
    }
  }
}
