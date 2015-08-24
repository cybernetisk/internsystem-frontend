import React from 'react'
import {admin} from '../../../api'

import PrisDato from '../common/components/PrisDato'
import PrisMargin from '../common/components/PrisMargin'
import VareMengde from '../common/components/VareMengde'

import {price} from '../../../services/FormatService'

export default class extends React.Component {

  static propTypes = {
    inventoryItems: React.PropTypes.array.isRequired
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
          {this.props.inventoryItems.reduce(function (prev, item) {
            item = item.toJS()

            if (lastGroup != item.innkjopskonto.gruppe) {
              lastGroup = item.innkjopskonto.gruppe
              prev.push((
                <tr className="group-row" key={item.innkjopskonto.gruppe}>
                  <th colSpan="5">{item.innkjopskonto.gruppe}</th>
                </tr>
              ))
            }

            prev.push((
              <tr key={item.id}>
                <td>
                  {item.kategori ? item.kategori + ': ' : ''}
                  <a href={admin(`varer/råvare/${item.id}/`)} target="_self">{item.navn}</a>
                  {item.status != 'OK' ? <span> <span className="status-text">{item.status}</span></span> : ''}
                  <br/>
                  <a className="gruppe-link" target="_self"
                    href={admin(`varer/konto/${item.innkjopskonto.id}/`)}>{item.innkjopskonto.navn}</a>
                </td>
                <td>
                  <VareMengde verdi={item.mengde} enhet={item.enhet}/>
                  {item.antall != 1 ?
                    <span className="vare-antall"><br />
                      ({item.antall} pcs)
                    </span> : ''}
                  {item.mengde_svinn ?
                    <span className="svinn-info"><br/>
                        ca. <VareMengde verdi={item.mengde_svinn} enhet={item.enhet}/> = spoilage
                    </span> : ''}
                </td>
                <td>
                  {item.innpris ?
                    <span>
                      {price(item.innpris.pris)}
                      {item.innpris.pant ?
                        <span className="pris-pant"><br/>
                          + {price(item.innpris.pant)} i pant {/* TODO: translate */}
                        </span> : ''}
                      <br />
                      <PrisDato dato={item.innpris.dato}/>
                    </span> : ''}
                </td>
                <td>
                  {item.salgspris ?
                    (item.salgspris.pris_intern ?
                      <span>
                        <a href={admin(`varer/salgsvare/${item.salgspris.id}/`)}
                          target="_self">{price(item.salgspris.pris_intern, 0)}</a>
                        {item.innpris ?
                          <span>
                            <br/>
                            <PrisMargin innPris={item.innpris.pris}
                              utPris={item.salgspris.pris_intern}
                              utMva={item.salgspris.mva}/>
                          </span> : ''}
                      </span> : 'See normal') : ''}
                </td>
                <td>
                  {item.salgspris ?
                    (item.salgspris.pris_ekstern ?
                      <span>
                        <a href={admin(`varer/salgsvare/${item.salgspris.id}/`)}
                          target="_self">{price(item.salgspris.pris_ekstern, 0)}</a>
                        {item.innpris ?
                          <span>
                            <br/>
                            <PrisMargin innPris={item.innpris.pris}
                              utPris={item.salgspris.pris_ekstern}
                              utMva={item.salgspris.mva}/>
                          </span> : ''}
                      </span> : 'No sales') : ''}
                </td>
              </tr>))
            return prev
          }, [])}
        </tbody>
      </table>
    )
  }
}
