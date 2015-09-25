import React from 'react'
import angularModule from '../../../../angularModule'

import PrisDato from '../../common/components/PrisDato'
import VareMengde from '../../common/components/VareMengde'
import VaretellingerItemNewVare from './VaretellingerItemNewVare'

import {price, antall} from '../../../../services/FormatService'

export default class VaretellingerItemListView extends React.Component {

  static propTypes = {
    raavarerfiltered: React.PropTypes.array.isRequired,
    vis_varer: React.PropTypes.string.isRequired,
    newItem: React.PropTypes.func.isRequired,
    newitems: React.PropTypes.object.isRequired
  }

  render() {
    var self = this
    var gruppe = null
    return (
      <table className="table table-condensed table-striped varer-table">
        <thead>
          <tr>
            <th>Raw material</th>
            <th>Quantity</th>
            <th>Price ex. VAT</th>
            <th>Counts</th>
          </tr>
        </thead>
        <tbody>
          {this.props.raavarerfiltered.reduce(function (prev, raavare) {
            if (gruppe != raavare.innkjopskonto) {
              gruppe = raavare.innkjopskonto

              var showGroupLabel = self.props.vis_varer != 'TELLING' || gruppe.summer.count > 0
              if (showGroupLabel) {
                prev.push((
                  <tr className="group-row" key={'gruppe-' + gruppe.id}>
                    <th colSpan="3">{gruppe.gruppe}: <a className="gruppe-link"
                      href={'varer/kontoer/'+gruppe.id}>{gruppe.navn}</a></th>
                    <th>
                      {price(gruppe.summer.sum, 2)} + {price(gruppe.summer.pant, 2)} i pant {/* TODO: translate */}
                    </th>
                  </tr>
                ))
              }
            }

            if (self.props.vis_varer != 'GRUPPER') {
              if (self.props.vis_varer != 'ALT' && raavare.tellinger.length == 0 && !self.props.newitems[raavare.id]) return prev

              var newItemEvent = self.props.newItem.bind(null, raavare)

              prev.push((
                <tr key={'raavare-' + raavare.id}>
                  <td>
                    {raavare.kategori ? raavare.kategori + ': ' : ''}
                    <a href={'admin/varer/råvare/'+raavare.id+'/'}>{raavare.navn}</a>
                    {raavare.status != 'OK' ?
                      <span> <span className="status-text">{raavare.status}</span></span> : ''}
                  </td>
                  <td>
                    <VareMengde verdi={raavare.mengde} enhet={raavare.enhet}/>
                    {raavare.antall != 1 ? <span className="vare-antall"><br />
                        ({raavare.antall} stk)
                      </span> : ''}
                    {raavare.mengde_svinn ? <span className="svinn-info"><br/>
                        ca. <VareMengde verdi={raavare.mengde_svinn} enhet={raavare.enhet}/> = svinn
                      </span> : ''}
                  </td>
                  <td>
                    {raavare.innpris ?
                      <span>
                        {price(raavare.innpris.pris)}
                        {raavare.innpris.pant ? <span className="pris-pant"><br/>
                          + {price(raavare.innpris.pant)} i pant
                        </span> : ''}<br />
                        <PrisDato dato={raavare.innpris.dato}/>
                      </span> : ''}
                  </td>
                  <td>
                    <div className="tellinger">
                      <ul>
                        {raavare.tellinger.map(function (telling) {
                          return (
                            <li key={'telling-'+telling.id}>
                              <a href={'admin/varer/varetellingvare/' + telling.id + '/'} target="_self">
                                {antall(telling.antall)}{' '}
                                ({price(telling.summer.sum)}{telling.summer.pant != 0 ?
                                <span> + {price(telling.summer.pant)} {telling.antallpant ?
                                  <span>({telling.antallpant})</span> : ''} i pant</span> : ''}){' '} {/* TODO: translate */}
                                {telling.kommentar} ({telling.sted})
                              </a>
                            </li>
                          )
                        })}
                        {(self.props.newitems[raavare.id] || []).map(function (item, index) {
                          return (
                            <li key={index}>
                              <VaretellingerItemNewVare item={item} ctrl={self.props}/>
                            </li>
                          )
                        })}
                      </ul>
                      <span className="nytelling"><a onClick={newItemEvent}><i className="glyphicon glyphicon-plus"/></a></span>
                    </div>
                  </td>
                </tr>))
            }

            return prev
          }, [])}
        </tbody>
      </table>)
  }
}

angularModule.value('VaretellingerItemListView', VaretellingerItemListView)
