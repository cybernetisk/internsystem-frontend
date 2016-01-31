import Immutable from 'immutable'
import React from 'react'
import moment from '../../../../moment'
import * as actions from '../actions'
import {addVare} from '../service'
import {fillCountSummer} from '../../common/functions'
import {fillBuyPrice} from '../../inventoryItems/service'

import InventoryItemSearch from '../../common/components/InventoryItemSearch'
import VareMengde from '../../common/components/VareMengde'
import Price from '../../common/components/Price'
import Quantity from '../../common/components/Quantity'

const getInitialState = () => ({
  antall: '',
  antallpant: '',
  comment: '',
  place: '',
  raavare: null,
  time_price: moment().format('YYYY-MM-DD'), // TODO: don't have default if not "svinn"
  isSending: false,
})

import './NewCount.scss'

export default class NewCount extends React.Component {

  static propTypes = {
    inventoryCountId: React.PropTypes.number.isRequired
  }

  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleInventoryItemSelect = this.handleInventoryItemSelect.bind(this)

    this.state = getInitialState()
    console.log(this.state)
  }

  handleChange(field) {
    return event => {
      const newValue = event.target ? event.target.value : event
      let newState = {[field]: newValue}

      if (field === 'time_price' && this.state.raavare) {
        newState.raavare = fillBuyPrice(this.state.raavare, newValue)
      }

      this.setState(newState)
    }
  }

  getNumber(value) {
    try {
      return math.eval(value.replace(",", "."))
    } catch (e) {
      return NaN
    }
  }

  handleSave(event) {
    // TODO: validation

    event.preventDefault()
    if (this.state.isSending || !this.state.raavare) {
      return
    }

    this.setState({isSending: true})

    // TODO: price_date

    let data = {
      raavare: this.state.raavare.get('id'),
      varetelling: this.props.inventoryCountId,
      antall: this.getNumber(this.state.antall),
      antallpant: this.getNumber(this.state.antallpant),
      kommentar: this.state.comment,
      sted: this.state.place,
      time_price: this.state.time_price
    }

    addVare(data).then(res => {
      actions.vareAdded(this.props.inventoryCountId, res)
      this.setState(getInitialState())
      this.refs.inventoryItemSearch.clear()
      this.refs.inventoryItemSearch.refs.autosuggest.input.focus()
    }, err => {
      alert(err.responseText)
      this.setState({isSending: false})
    })
  }

  handleInventoryItemSelect(raavare) {
    this.setState({
      raavare: raavare ? fillBuyPrice(raavare, this.state.time_price) : null
    })
  }

  renderMengde() {
    if (this.state.raavare) {
      const mengde = <VareMengde verdi={this.state.raavare.get('mengde')} enhet={this.state.raavare.get('enhet')}/>

      return (
        <span>x {mengde} = {this.renderValue()}</span>
      )
    }

    return 'Select product'
  }

  renderValue() {
    if (this.state.antall && this.state.raavare) {
      let count = Immutable.Map({
        antall: this.getNumber(this.state.antall),
        antallpant: this.getNumber(this.state.antallpant),
        time_price: this.state.time_price,
      })
      count = fillCountSummer(count, this.state.raavare)

      return (
        <span>
          <Quantity product={this.state.raavare} count={count} />
          {' = '}
          <Price
            price={count.getIn(['summer', 'sum'])}
            priceDate={this.state.raavare.getIn(['innpris', 'dato'])}
            priceDateRelativeTo={this.state.time_price || this.props.time}
            pant={count.getIn(['summer', 'pant'])}/>
        </span>
      )
    }

    return '?'
  }

  render() {
    return (
      <div className="panel panel-default varer-inventoryCountNewCount">
        <div className="panel-heading">
          Register inventory item
        </div>
        <div className="panel-body">
          <form onSubmit={this.handleSave}>
            <div className="row">
              <div className="col-sm-4">
                <InventoryItemSearch onSelect={this.handleInventoryItemSelect} ref="inventoryItemSearch" />
              </div>
              <div className="col-sm-2">
                <input type="text" className="form-control" placeholder="Quantity, e.g. 6*3+1" value={this.state.antall}
                  onChange={this.handleChange('antall')}/>
              </div>
              <div className="col-sm-3 form-control-static">
                {this.renderMengde()}
              </div>
              {/*<div className="col-sm-2">
                <input type="text" className="form-control" placeholder="Pant (quantity) (optional)" value={this.state.antallpant}
                  onChange={this.handleChange('antallpant')}/>
              </div>*/}
              <div className="col-sm-2">
                <input type="submit" className="form-control btn-success" value="Register"/>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-8">
                <input type="text" className="form-control" placeholder="Comment (optional)" value={this.state.comment}
                  onChange={this.handleChange('comment')}/>
              </div>
              <div className="col-sm-2">
                <input type="text" className="form-control" placeholder="Location (optional)" value={this.state.place}
                  onChange={this.handleChange('place')}/>
              </div>
              <div className="col-sm-2">
                <input type="date" className="form-control" placeholder="date of work" value={this.state.time_price}
                  onChange={this.handleChange('time_price')}/>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
