import React from 'react'
import {connect} from 'nuclear-js-react-addons'
import moment from '../../../../moment'
import {admin} from '../../../../api'

import './List.scss'

import ProductName from '../../common/components/ProductName'
import Price from '../../common/components/Price'
import Quantity from '../../common/components/Quantity'
import PrisDato from '../../common/components/PrisDato'
import VareMengde from '../../common/components/VareMengde'

import inventoryProductsListTable from '../../inventoryItems/ListTable'

import {price, antall} from '../../../../services/FormatService'

import {
  counts,
  time,
} from './getters'

@connect(props => ({
  counts,
  time,
}))
export default class List extends React.Component {

  renderRegDate(count) {
    let addedTime = null
    if (count.get('time_added')) {
      addedTime = moment(count.get('time_added')).format('YYYY-MM-DD HH:mm')
    }

    let regBy = null
    if (count.get('added_by')) {
      regBy = `by ${count.getIn(['added_by', 'username'])}`
    }

    let priceTime = null
    if (count.get('time_price')) {
      priceTime
    }

    if (!addedTime && !regBy) return null

    return (
      <span className="varer-regBy">
        Registered {addedTime} {regBy}
      </span>
    )
  }

  render() {
    if (this.props.counts.size === 0) return (
      <p>No data found.</p>
    )

    return (
      <table className="table table-condensed table-striped varer-table varer-inventoryCountRegistrationsList">
        <thead>
          <tr>
            <th>Raw material</th>
            <th>&nbsp;</th>
            <th>Qty</th>
            <th>Value ex. VAT</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {this.props.counts.map(count => (
            <tr key={count.get('id')}>
              <td><ProductName product={count.get('raavare')}/></td>
              <td><Quantity product={count.get('raavare')}/></td>
              <td>
                {antall(count.get('antall'))}
                {count.get('sted') ? <div>({count.get('sted')})</div> : ''}
              </td>
              <td>
                <Price
                  price={count.getIn(['summer', 'sum'])}
                  priceDate={count.getIn(['raavare', 'innpris', 'dato'])}
                  priceDateRelativeTo={count.get('time_price') || this.props.time}
                  pant={count.getIn(['summer', 'pant'])}/>
              </td>
              <td>
                <div>{count.get('kommentar')}</div>
                <div>{this.renderRegDate(count)}</div>
              </td>
              <td>
                <a href={admin(`varer/varetellingvare/${count.get('id')}/`)} target="_self">
                  <i className="glyphicon glyphicon-pencil"/>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>)
  }
}
