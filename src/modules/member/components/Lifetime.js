import { connect } from "nuclear-js-react-addons-chefsplate"
import React from "react"
import { isLoggedIn } from "../../auth/getters"
import * as actions from "../actions"
import * as getters from "../getters"
import List from "./List"

@connect(() => ({
  isLoggedIn,
  member: getters.members,
}))
export default class Lifetime extends React.Component {
  componentDidMount() {
    actions.getLifetimeMember(1, 50)
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
