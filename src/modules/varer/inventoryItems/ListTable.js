import React from 'react'
import {admin} from '../../../api'

import PrisDato from '../common/components/PrisDato'
import PrisMargin from '../common/components/PrisMargin'
import VareMengde from '../common/components/VareMengde'
import SellPrice from '../common/components/SellPrice'

import {price} from '../../../services/FormatService'

export default class extends React.Component {

  static propTypes = {
    inventoryItems: React.PropTypes.object.isRequired
  }

  renderName(item, showAccount = true) {
    let category
    if (item.get('kategori')) {
      category = item.get('kategori') + ': '
    }

    let tag
    if (item.get('status') != 'OK') {
      tag = <span> <span className="status-text">{item.get('status')}</span></span>
    }

    let account
    if (showAccount) {
      account = (
        <span>
          <br/>
          <a className="gruppe-link" href={admin(`varer/konto/${item.get('innkjopskonto').get('id')}/`)}>
            {item.get('innkjopskonto').get('navn')}
          </a>
        </span>
      )
    }

    return (
      <div>
        {category}
        <a href={admin(`varer/råvare/${item.get('id')}/`)}>{item.get('navn')}</a>
        {tag}
        {account}
      </div>
    )
  }

  renderQuantity(item) {
    let pieces
    if (item.get('antall') !== 1) {
      pieces = <span className="vare-antall"><br />({item.get('antall')} pcs)</span>
    }

    let spoilage
    if (item.get('mengde_svinn')) {
      spoilage = (
        <span className="svinn-info">
          <br/>
          ca. <VareMengde verdi={item.get('mengde_svinn')} enhet={item.get('enhet')}/> = spoilage
        </span>
      )
    }

    return [
      <VareMengde verdi={item.get('mengde')} enhet={item.get('enhet')}/>,
      pieces,
      spoilage
    ]
  }

  renderBuyPrice(item) {
    if (item.get('innpris')) {
      let pant
      if (item.get('innpris').get('pant')) {
        // TODO: translate to english
        pant = <span className="pris-pant"><br/>+ {price(item.get('innpris').get('pant'))} i pant</span>
      }

      return (
        <span>
          {price(item.get('innpris').get('pris'))}
          {pant}
          <br />
          <PrisDato dato={item.get('innpris').get('dato')}/>
        </span>
      )
    }
  }

  renderInternalPrice(item) {
    if (item.get('salgspris')) {
      return <SellPrice item={item} isInternal={true}/>
    }
  }

  renderNormalPrice(item) {
    if (item.get('salgspris')) {
      return <SellPrice item={item} isInternal={false}/>
    }
  }

  render() {
    var lastGroup = null
    return (
      <table className="table table-striped table-condensed varer-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price ex. VAT</th>
            <th>Internal price</th>
            <th>Normal price</th>
          </tr>
        </thead>
        <tbody>
          {this.props.inventoryItems.reduce((prev, item) => {
            if (lastGroup !== item.get('innkjopskonto').get('gruppe')) {
              lastGroup = item.get('innkjopskonto').get('gruppe')
              prev.push((
                <tr className="group-row" key={item.get('innkjopskonto').get('gruppe')}>
                  <th colSpan="5">{item.get('innkjopskonto').get('gruppe')}</th>
                </tr>
              ))
            }

            prev.push((
              <tr key={item.get('id')}>
                <td>{this.renderName(item)}</td>
                <td>{this.renderQuantity(item)}</td>
                <td>{this.renderBuyPrice(item)}</td>
                <td>{this.renderInternalPrice(item)}</td>
                <td>{this.renderNormalPrice(item)}</td>
              </tr>))
            return prev
          }, [])}
        </tbody>
      </table>
    )
  }
}
