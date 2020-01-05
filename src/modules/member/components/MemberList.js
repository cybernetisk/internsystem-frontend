import { connect } from "nuclear-js-react-addons-chefsplate"
import React from "react"
import { isLoggedIn, userDetails } from "../../auth/getters"
import * as actions from "../actions"
import List from "./List"

export default
@connect(() => ({
  userDetails,
  isLoggedIn,
}))
class MemberList extends React.Component {
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
