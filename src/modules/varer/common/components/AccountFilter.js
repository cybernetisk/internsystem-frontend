import PropTypes from "prop-types"
import React from "react"

export default class AccountFilter extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.any,
    accounts: PropTypes.object.isRequired,
  }

  render() {
    return (
      <select
        className="form-control"
        onChange={this.props.onChange}
        value={this.props.value}
      >
        <option value="0">-- not selected --</option>
        {this.props.accounts.map(list => (
          <optgroup
            label={list.first().get("gruppe")}
            key={list.first().get("gruppe")}
          >
            {list.map(account => (
              <option
                value={account.get("compareValue")}
                key={account.get("id")}
              >
                {account.get("navn")}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    )
  }
}
