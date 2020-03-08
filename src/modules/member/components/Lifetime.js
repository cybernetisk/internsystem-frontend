import React from "react"
import * as actions from "../actions"
import List from "./List"

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
