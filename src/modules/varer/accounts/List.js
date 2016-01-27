import React from 'react'
import { connect } from 'nuclear-js-react-addons'

import {fetchAccounts} from './actions'
import {accounts, accountsLoader} from './getters'

import Loader from '../../../components/Loader'

@connect(props => ({
  accounts,
  accountsLoader
}))
export default class List extends React.Component {

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
            <tr>
              <td>{account.id}</td>
              <td><a href={`admin/varer/konto/${account.id}/`} target="_self">{account.navn}</a></td>
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
    let accounts = this.props.accounts.get('items').toJS()

    return (
      <div>
        <h1>Account list</h1>

        <Loader {...this.props.accountsLoader}>No accounts exist.</Loader>

        {accounts.length ? this.renderList(accounts) : ''}
      </div>
    )
  }
}
