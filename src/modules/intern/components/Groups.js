import React from "react";
import {connect} from "nuclear-js-react-addons";
import getters from "../getters";
import * as actions from "../actions";

@connect(props => ({
  groups: getters.groups,
  userDetails,
  isLoggedIn
}))
export  default class Groups extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    actions.getGroups()
  }

  renderTable() {
    return (
      <table className="table table-responsive">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Leader</th>
          </tr>
        </thead>
        <tbody>
          {this.props.groups.get('data').get('results').toJS().map((group) => {
            return (
              <tr key={group.id}>
                <td>{group.id}</td>
                <td>{group.name}</td>
                <td>{group.leader.name}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }

  render() {
    return (
      <h1>Not implemented yet</h1>
    )
  }
}
