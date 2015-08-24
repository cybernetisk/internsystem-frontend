import React from 'react'
import {admin} from '../../../api'

import PrisDato from '../common/components/PrisDato'
import VareMengde from '../common/components/VareMengde'

import {price} from '../../../services/FormatService'
import * as renders from '../common/renders'

export default class extends React.Component {

  static propTypes = {
    salesProducts: React.PropTypes.array.isRequired
  }

  renderName(item) {
    let category
    if (item.get('kategori')) {
      category = item.get('kategori') + ': '
    }

    let tag
    if (item.get('status') != 'OK') {
      tag = <span> <span className="status-text">{item.get('status')}</span></span>
    }

    return (
      <div>
        {category}
        <a href={admin(`varer/salgsvare/${item.get('id')}/`)} target="_self">{item.get('navn')}</a>
        {tag}
        <br/>
        <a className="gruppe-link" href={admin(`kontoer/${item.get('salgskonto').get('id')}`)}>
          {item.get('salgskonto').get('navn')}
        </a>
      </div>
    )
  }

  renderInventoryItems(item) {
    if (!item.get('raavarer').count()) {
      return
    }

    return (
      <ul>
        {item.get('raavarer').map(meta => {
          let quantity
          if (meta.get('mengde') != meta.get('raavare').get('mengde')) {
            quantity = [<VareMengde verdi={meta.get('mengde')} enhet={meta.get('raavare').get('enhet')}/>, ' ']
          }

          let buyprice
          if (meta.get('innpris')) {
            buyprice = (
              <span>
                {' '}
                (
                {price(meta.get('innpris_accurate'))}
                {' '}
                <PrisDato dato={meta.get('innpris').get('dato')}/>
                )
              </span>
            )
          }

          return (
            <li key={meta.get('id')}>
              {quantity}
              <a href={admin(`råvarer/${meta.get('raavare').get('id')}/`)}>{meta.get('raavare').get('navn')}</a>
              {buyprice}
            </li>)
        })}
      </ul>
    )
  }

  render() {
    let lastGroup

    return (
      <table className="table table-striped table-condensed varer-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Register#</th>
            <th>Internal price</th>
            <th>Normal price</th>
            <th>Inventory items (ex. VAT)</th>
          </tr>
        </thead>
        <tbody>
          {this.props.salesProducts.reduce((prev, item) => {
            if (lastGroup != item.get('salgskonto').get('gruppe')) {
              lastGroup = item.get('salgskonto').get('gruppe')
              prev.push((
                <tr className="group-row" key={item.get('salgskonto').get('gruppe')}>
                  <th colSpan="5">{item.get('salgskonto').get('gruppe')}</th>
                </tr>
              ))
            }

            prev.push((
              <tr key={item.get('id')}>
                <td>{this.renderName(item)}</td>
                <td>{item.get('kassenr')}</td>
                <td>{renders.renderInternalPrice(item)}</td>
                <td>{renders.renderNormalPrice(item)}</td>
                <td>{this.renderInventoryItems(item)}</td>
              </tr>))

            return prev
          }, [])}
        </tbody>
      </table>
    )
  }
}
