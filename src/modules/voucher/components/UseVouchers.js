import React from 'react'
import * as actions from '../actions'
import moment from '../../../moment'
import Autosuggest from 'react-autosuggest'

import VoucherService from '../services/VoucherService'

import UserInput from './UserInput'

export default class UseVouchers extends React.Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.updateAvailable = this.updateAvailable.bind(this)

    this.state = {
      username: '',
      vouchers: '',
      vouchers_available: 'unknown',
      comment: '',
      isSending: false
    }
  }

  handleChange(field) {
    return event => {
      let val = event.target ? event.target.value : event
      this.setState({[field]: val})
      if (field == 'username') {
        this.updateAvailable(val)
      }
    }
  }

  updateAvailable(username) {
    if (username == '') {
      this.setState({
        vouchers_available: 'unknown'
      })
      return
    }

    this.setState({
      vouchers_available: 'loading'
    })
    VoucherService.getWallets({user: username, valid: true}).then(result => {
      this.setState({
        vouchers_available: result.reduce((prev, wallet) => prev + parseFloat(wallet.cached_balance), 0)
      })
    }, error => {
      this.setState({
        vouchers_available: 'unknown'
      })
    })
  }

  handleSave(event) {
    // TODO: validation

    event.preventDefault()
    if (this.state.isSending) {
      return
    }

    this.setState({isSending: true})

    let s = this.state
    VoucherService.useVouchers(s.username, s.vouchers, s.comment).then(result => {
      actions.fetchUseLogs(1)
      this.setState({
        isSending: false,
        username: '',
        vouchers: '',
        vouchers_available: 'unknown'
      })
    }, error => {
      alert(error.responseText)
      this.setState({isSending: false})
    })
  }

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          Use vouchers
        </div>
        <div className="panel-body">
          <form onSubmit={this.handleSave}>
            <div className="row">
              <div className="col-sm-2">
                <UserInput value={this.state.username} onChange={this.handleChange('username')}/>
              </div>
              <div className="col-sm-2 text-center">
                <div className="form-control-static">Available: {this.state.vouchers_available}</div>
              </div>
              <div className="col-sm-3">
                <input type="number" className="form-control" placeholder="Number of vouchers to spend"
                  value={this.state.vouchers}
                  onChange={this.handleChange('vouchers')}/>
              </div>
              <div className="col-sm-3">
                <input type="text" className="form-control" placeholder="Optional comment" value={this.state.comment}
                  onChange={this.handleChange('comment')}/>
              </div>
              <div className="col-sm-2">
                <input type="submit" className="form-control btn-warning" value="Use vouchers"/>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
