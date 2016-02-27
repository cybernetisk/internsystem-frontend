import React from 'react'
import {connect} from 'nuclear-js-react-addons'

import Account from '../../common/components/Account'
import ProductName from '../../common/components/ProductName'
import BuyPrice from '../../common/components/BuyPrice'
import Quantity from '../../common/components/Quantity'
import VaretellingerItemNewVare from './NewVare'

import inventoryProductsListTable from '../../inventoryItems/ListTable'

import {price, antall} from '../../../../services/FormatService'

import {
  filters,
  accountsSummerFiltered,
  filteredList,
} from './getters'

@connect(props => ({
  filters,
  accountsSummerFiltered,
  filteredList,
}))
export default class List extends React.Component {

  static propTypes = {
    newItem: React.PropTypes.func.isRequired,
    newitems: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      focusNum: 0
    }
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  handleKeyDown(e) {
    const KEY_UP = 38
    const KEY_DOWN = 40
    const KEY_PLUS = 187
    const KEY_NUMPAD_PLUS = 107

    if (e.ctrlKey && e.keyCode === KEY_UP) {
      e.preventDefault()
      let num = this.state.focusNum - 1
      if (num < 0) {
        num = this.props.filteredList.size - 1
      }
      this.setState({focusNum: num})
    }

    else if (e.ctrlKey && e.keyCode === KEY_DOWN) {
      e.preventDefault()
      this.setState({focusNum: this.state.focusNum + 1})
    }

    else if ((e.keyCode === KEY_PLUS || e.keyCode === KEY_NUMPAD_PLUS) && this.props.filteredList.size > 0) {
      e.preventDefault()
      this.props.newItem(this.props.filteredList.get(this.state.focusNum % this.props.filteredList.size))
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown)
  }

  renderAmount(summer, count_pant = null) {
    let pant = ''
    if (summer.get('pant') != 0) {
      let count_text = ''
      if (count_pant) {
        count_text = ` (${count_pant})`
      }
      pant = ` + ${price(summer.get('pant'), 2)}${count_text} i pant`
    }

    return price(summer.get('sum'), 2) + pant
  }

  renderCounts(raavare) {
    return (
      <div className="tellinger">
        <ul>
          {raavare.get('tellinger').map(telling => (
            <li key={'telling-'+telling.get('id')}>
              <a href={'admin/varer/varetellingvare/' + telling.get('id') + '/'} target="_self">
                {antall(telling.get('antall'))}
                {' '}
                ({this.renderAmount(telling.get('summer'), telling.get('antallpant'))})
                {' '}
                {telling.get('kommentar')}
                {telling.get('sted') ? ` (${telling.get('sted')})` : ''}
              </a>
            </li>
          ))}
          {(this.props.newitems.get(raavare.get('id'), [])).map(function (item, index) {
            return (
              <li key={index}>
                <VaretellingerItemNewVare {...item}/>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  render() {
    if (this.props.filteredList.size === 0) return (
      <p>No data found.</p>
    )

    let gruppe = null

    return (
      <table className="table table-condensed table-striped varer-table varer-table-items">
        <thead>
          <tr>
            <th>Raw material</th>
            <th>Quantity</th>
            <th>Price ex. VAT</th>
            <th>Counts</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {this.props.filteredList.reduce((prev, raavare, i) => {
            if (!gruppe || gruppe.get('id') != raavare.getIn(['innkjopskonto', 'id'])) {
              gruppe = raavare.get('innkjopskonto')
              let summer = this.props.accountsSummerFiltered.get(gruppe.get('id'))

              prev.push((
                <tr className="group-row" key={'gruppe-' + gruppe.get('id')}>
                  <th colSpan="3"><Account account={gruppe} showGroup={true}/></th>
                  <th colSpan="2">
                    {this.renderAmount(summer)}
                  </th>
                </tr>
              ))
            }

            let btnClass = this.state.focusNum % this.props.filteredList.size === i
              ? ' btn-sm'
              : ' btn-xs'

            prev.push((
              <tr key={`raavare-${raavare.get('id')}`}>
                <td><ProductName product={raavare} showAccount={false}/></td>
                <td><Quantity product={raavare}/></td>
                <td><BuyPrice product={raavare}/></td>
                <td>{this.renderCounts(raavare)}</td>
                <td>
                  <button type="button" className={'hidden-print btn btn-primary' + btnClass}
                    onClick={() => this.props.newItem(raavare)}
                  >
                    <span className="glyphicon glyphicon-plus"/>
                  </button>
                </td>
              </tr>))

            return prev
          }, [])}
        </tbody>
      </table>)
  }
}
