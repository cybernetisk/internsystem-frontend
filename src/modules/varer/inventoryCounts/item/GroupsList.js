import React from 'react'
import {connect} from 'nuclear-js-react-addons'

import Account from '../../common/components/Account'

import {price} from '../../../../services/FormatService'

import {
  groupsViewData,
} from './getters'

@connect(props => ({
  groupsViewData,
}))
export default class GroupsList extends React.Component {

  render() {
    if (this.props.groupsViewData.size === 0) return (
      <p>No data found.</p>
    )

    return (
      <table className="table table-condensed table-striped varer-table varer-table-groups">
        <thead>
          <tr>
            <th>Group</th>
            <th>Price ex. VAT</th>
            <th>Pant</th>
            <th>Sum</th>
          </tr>
        </thead>
        <tbody>
          {this.props.groupsViewData.reduce((prev, group, group_name) => {
            let summer = group.get('summer')
            prev.push((
              <tr className="group-row" key={'group-' + group_name}>
                <th>{group_name}</th>
                <th>{price(summer.get('sum'), 2)}</th>
                <th>{price(summer.get('pant'), 2)}</th>
                <th>{price(summer.get('sum') + group.get('summer').get('pant'), 2)}</th>
              </tr>
            ))

            group.get('accounts').forEach(account => {
              let data = account.get('data')
              let summer = account.get('summer')
              prev.push((
                <tr key={'account-' + data.get('id')}>
                  <td><Account account={data}/></td>
                  <td>{price(summer.get('sum'), 2)}</td>
                  <td>{price(summer.get('pant'), 2)}</td>
                  <td>{price(summer.get('sum') + summer.get('pant'), 2)}</td>
                </tr>
              ))
            })

            return prev
          }, [])}
        </tbody>
      </table>)
  }
}
