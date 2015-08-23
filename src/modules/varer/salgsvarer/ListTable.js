import React from 'react'

import PrisDato from '../common/components/PrisDato'
import PrisMargin from '../common/components/PrisMargin'
import VareMengde from '../common/components/VareMengde'

import {price} from '../../../services/FormatService'

export default class extends React.Component {

  static propTypes = {
    salesProducts: React.PropTypes.array.isRequired
  }

  render() {
    var lastGroup = null
    return (
      <table className="table table-striped table-condensed varer-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Register#</th>
            <th>Internal price</th>
            <th>Normal price</th>
            <th>Raw materials (ex. VAT)</th>
          </tr>
        </thead>
        <tbody>
          {this.props.salesProducts.reduce(function (prev, item) {
            if (lastGroup != item.salgskonto.gruppe) {
              lastGroup = item.salgskonto.gruppe
              prev.push((
                <tr className="group-row" key={item.salgskonto.gruppe}>
                  <th colSpan="5">{item.salgskonto.gruppe}</th>
                </tr>
              ))
            }

            prev.push((
              <tr key={item.id}>
                <td>
                  {item.kategori ? item.kategori + ': ' : ''}
                  {/*<a ui-sref="salgsvare({id:item.id})">{item.navn}</a>*/}
                  <a href={'admin/varer/salgsvare/' + item.id + '/'} target="_self">{item.navn}</a>
                  {item.status != 'OK' ? <span> <span className="status-text">{item.status}</span></span> : ''}
                  <br/>
                  <a className="gruppe-link" href={'admin/kontoer/'+item.salgskonto.id}
                    title={item.salgskonto.navn}>{item.salgskonto.navn}</a>
                </td>
                <td>{item.kassenr}</td>
                <td>
                  {item.salgspris && item.salgspris.pris_intern ?
                    <span>
                      {price(item.salgspris.pris_intern, 0)}
                      {item.innpris ?
                        <span>
                          <br/>
                          <PrisMargin innPris={item.innpris}
                            utPris={item.salgspris.pris_intern}
                            utMva={item.salgspris.mva}/>
                       </span> : ''}
                    </span> : 'See normal'}
                </td>
                <td>
                  {item.salgspris && item.salgspris.pris_ekstern ?
                    <span>
                      {price(item.salgspris.pris_ekstern, 0)}
                      {item.innpris ?
                        <span>
                          <br/>
                          <PrisMargin innPris={item.innpris}
                            utPris={item.salgspris.pris_ekstern}
                            utMva={item.salgspris.mva}/>
                        </span> : ''}
                    </span> : 'No sales'}
                </td>
                <td>
                  <ul>
                    {item.raavarer.map(function (meta) {
                      return (
                        <li key={meta.id}>
                          {/*<span ng-show="::meta.raavare.kategori">{meta.raavare.kategori}: </span>*/}
                          {/*<span ng-if="meta.mengde == meta.raavare.mengde">1 stk</span>*/}
                          {meta.mengde != meta.raavare.mengde ?
                            <span><VareMengde verdi={meta.mengde} enhet={meta.raavare.enhet}/> </span> : ''}
                          <a href={'varer/råvarer/'+meta.raavare.id}>{meta.raavare.navn}</a>

                          {meta.innpris ?
                            <span>
                              &nbsp;({price(meta.innpris_accurate)} <PrisDato dato={meta.innpris.dato}/>)
                            </span> : ''}
                        </li>)
                    })}
                  </ul>
                </td>
              </tr>))

            return prev
          }, [])}
        </tbody>
      </table>
    )
  }
}
