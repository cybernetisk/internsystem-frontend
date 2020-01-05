import React from "react"
import * as actions from "../actions"
import InternList from "./InternList"

export default class Interns extends React.Component {
  constructor(props) {
    super(props)
    actions.getInterns(1, 50, "")
  }

  render() {
    return <InternList />
  }
}
