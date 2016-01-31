import React from 'react'
import * as actions from '../actions'
import {addVare} from '../service'

import InventoryItemSearch from '../../common/components/InventoryItemSearch'

const getInitialState = () => ({
  antall: '',
  antallpant: '',
  kommentar: '',
  sted: '',
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

  handleSave(event) {
    // TODO: validation

    event.preventDefault()
    if (this.state.isSending || !this.state.raavare) {
      return
    }

    this.setState({isSending: true})

    // TODO: price_date

    let data = {
      raavare: this.state.raavare,
      varetelling: this.props.inventoryCountId,
      antall: math.eval(this.state.antall.replace(",", ".")),
      antallpant: math.eval(this.state.antallpant.replace(",", ".")),
      kommentar: this.state.kommentar,
      sted: this.state.sted
    }

    addVare(data).then(res => {
      actions.vareAdded(this.props.inventoryCountId, res)
      this.setState(getInitialState())
    }, err => {
      alert(err.responseText)
      this.setState({isSending: false})
    })
  }

  handleInventoryItemSelect(raavare) {
    this.setState({
      raavare: raavare ? raavare.get('id') : null
    })
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
              <div className="col-sm-4">
                <InventoryItemSearch onSelect={this.handleInventoryItemSelect}/>
              </div>
              <div className="col-sm-2">
                <input type="text" className="form-control" placeholder="Quantity" value={this.state.antall}
                  onChange={this.handleChange('antall')}/>
              </div>
              {/*<div className="col-sm-2">
                <input type="text" className="form-control" placeholder="Pant (quantity) (optional)" value={this.state.antallpant}
                  onChange={this.handleChange('antallpant')}/>
              </div>*/}
              <div className="col-sm-2">
                <input type="text" className="form-control" placeholder="Location (optional)" value={this.state.sted}
                  onChange={this.handleChange('sted')}/>
              </div>
              <div className="col-sm-2">
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
