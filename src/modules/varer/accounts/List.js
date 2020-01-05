import { connect } from "nuclear-js-react-addons-chefsplate"
import React from "react"
import { admin } from "../../../api"
import Loader from "../../../components/Loader"
import { fetchAccounts } from "./actions"
import { accounts, accountsLoader } from "./getters"

export default
@connect(() => ({
  accounts,
  accountsLoader,
}))
class List extends React.Component {
  componentDidMount() {
    fetchAccounts()
  }

  renderList(accounts) {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Group</th>
            <th>Purchase account</th>
            <th>Inventory account</th>
            <th>Inventory change account</th>
            <th>Sales account</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map(account => (
            <tr key={account.id}>
              <td>{account.id}</td>
              <td>
                <a href={admin(`varer/konto/${account.id}/`)} target="_self">
                  {account.navn}
                </a>
              </td>
              <td>{account.gruppe}</td>
              <td>{account.innkjopskonto}</td>
              <td>{account.varelagerkonto}</td>
              <td>{account.beholdningsendringskonto}</td>
              <td>{account.salgskonto}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  render() {
    const accounts = this.props.accounts.get("items").toJS()

    return (
      <div>
        <h1>Account list</h1>

        <Loader {...this.props.accountsLoader}>No accounts exist.</Loader>

        {accounts.length ? this.renderList(accounts) : ""}
      </div>
    )
  }
}
