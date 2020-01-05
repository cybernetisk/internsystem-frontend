import React from "react"
import { connect } from "react-redux"
import { getIsLoggedIn, getUserDetails } from "../../auth/selectors"
import * as actions from "../actions"
import List from "./List"

@connect(state => ({
  userDetails: getUserDetails(state),
  isLoggedIn: getIsLoggedIn(state),
}))
export default class MemberList extends React.Component {
  constructor(props) {
    super(props)
    actions.getMemberList(1, 50, "date_joined")
  }

  render() {
    if (!this.props.isLoggedIn) {
      return <h1>You haven't logged in! Please login!</h1>
    }

    return (
      <div>
        <h1>Memberlist</h1>
        <List switcher={true} />
      </div>
    )
  }
}
