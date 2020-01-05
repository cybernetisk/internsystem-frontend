import { connect } from "nuclear-js-react-addons-chefsplate"
import React from "react"
import { connect as reduxConnect } from "react-redux"
import { getIsLoggedIn } from "../../auth/selectors"
import * as actions from "../actions"
import * as getters from "../getters"
import List from "./List"

@connect(() => ({
  isLoggedIn,
  member: getters.members,
}))
@reduxConnect(state => ({
  isLoggedIn: getIsLoggedIn(state),
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
