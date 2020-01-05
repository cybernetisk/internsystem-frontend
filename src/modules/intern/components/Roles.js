import { connect } from "nuclear-js-react-addons-chefsplate"
import React from "react"
import { Link } from "react-router-dom"
import { isLoggedIn, userDetails } from "../../auth/getters"
import * as actions from "../actions"
import * as getters from "../getters"

@connect(() => ({
  roles: getters.roles,
  userDetails,
  isLoggedIn,
}))
export default class Roles extends React.Component {
  componentDidMount() {
    actions.getRoles()
  }

  renderTable() {
    return (
      <table className="table table-responsive">
        <thead>
          <tr>
            <th>Name</th>
            <th>Groups</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {this.props.roles
            .get("data")
            .toJS()
            .map(role => (
              <tr key={role.id}>
                <th>
                  <Link to={`/intern/role/${role.id}`}>{role.name}</Link>
                </th>
                <th>
                  <ul>
                    {role.groups.map(group => (
                      <li key={group.id}>
                        <Link to={`/intern/group/${group.id}`}>
                          {group.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </th>
                <th>{role.description}</th>
              </tr>
            ))}
        </tbody>
      </table>
    )
  }

  render() {
    if (!this.props.isLoggedIn) {
      return <h1>Not logged in! Please login!</h1>
    }
    if (this.props.roles.get("isLoading")) {
      return <div>Loading...</div>
    }
    return this.renderTable()
  }
}
