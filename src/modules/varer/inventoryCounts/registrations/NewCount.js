import Immutable from 'immutable'
import React from 'react'
import * as actions from '../actions'
import {addVare} from '../service'
import {fillCountSummer} from '../../common/functions'

import InventoryItemSearch from '../../common/components/InventoryItemSearch'
import VareMengde from '../../common/components/VareMengde'
import Price from '../../common/components/Price'

const getInitialState = () => ({
  antall: '',
  antallpant: '',
  comment: '',
  place: '',
  raavare: null,
  isSending: false,
})

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
      this.setState({[field]: event.target ? event.target.value : event})
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
      sted: this.state.place
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
      raavare
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
      let time_price = null // TODO: support individual timestamps

      let count = Immutable.Map({
        antall: this.getNumber(this.state.antall),
        antallpant: this.getNumber(this.state.antallpant),
      })
      count = fillCountSummer(count, this.state.raavare)

      console.log(this.state.raavare)

      return (
        <Price
          price={count.getIn(['summer', 'sum'])}
          priceDate={this.state.raavare.getIn(['innpris', 'dato'])}
          priceDateRelativeTo={time_price || this.props.time}
          pant={count.getIn(['summer', 'pant'])}/>
      )
    }

    return '?'
  }

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          Register inventory item
        </div>
        <div className="panel-body">
          <form onSubmit={this.handleSave}>
            <div className="row">
              <div className="col-sm-3">
                <InventoryItemSearch onSelect={this.handleInventoryItemSelect} ref="inventoryItemSearch" />
              </div>
              <div className="col-sm-2">
                <input type="text" className="form-control" placeholder="Quantity" value={this.state.antall}
                  onChange={this.handleChange('antall')}/>
              </div>
              <div className="col-sm-2 form-control-static">
                {this.renderMengde()}
              </div>
              {/*<div className="col-sm-2">
                <input type="text" className="form-control" placeholder="Pant (quantity) (optional)" value={this.state.antallpant}
                  onChange={this.handleChange('antallpant')}/>
              </div>
              <div className="col-sm-2">
                <input type="text" className="form-control" placeholder="Location (optional)" value={this.state.place}
                  onChange={this.handleChange('place')}/>
              </div>*/}
              <div className="col-sm-3">
                <input type="text" className="form-control" placeholder="Comment (optional)" value={this.state.comment}
                  onChange={this.handleChange('comment')}/>
              </div>
              <div className="col-sm-2">
                <input type="submit" className="form-control btn-success" value="Register"/>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
