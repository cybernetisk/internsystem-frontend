import React from 'react'
import * as actions from '../actions'
import moment from '../../../moment'
import Autosuggest from 'react-autosuggest'

import VoucherService from '../services/VoucherService'

import UserInput from './UserInput'
import WorkGroupInput from './WorkGroupInput'

export default class NewWorkLog extends React.Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleSave = this.handleSave.bind(this)

    this.state = {
      date: moment().format('YYYY-MM-DD'),
      work_group: '',
      username: '',
      hours: '',
      comment: '',
      isSending: false
    }
  }

  handleChange(field) {
    return event => {
      this.setState({[field]: event.target ? event.target.value : event})
    }
  }

  handleSave(event) {
    // TODO: validation

    event.preventDefault()
    if (this.state.isSending) {
      return
    }

    this.setState({isSending: true})

    let s = this.state
    VoucherService.registerWork(s.username, s.date, s.work_group, s.hours, s.comment).then(result => {
      actions.fetchWorkLogs(1)
      this.setState({
        isSending: false,
        username: ''
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
          Register work
        </div>
        <div className="panel-body">
          <form onSubmit={this.handleSave}>
            <div className="row">
              <div className="col-sm-2">
                <input type="date" className="form-control" placeholder="date of work" value={this.state.date}
                  onChange={this.handleChange('date')}
                />
              </div>
              <div className="col-sm-2">
                <WorkGroupInput value={this.state.work_group} onChange={this.handleChange('work_group')}/>
              </div>
              <div className="col-sm-2">
                <UserInput value={this.state.username} onChange={this.handleChange('username')}/>
              </div>
              <div className="col-sm-2">
                <input type="number" className="form-control" placeholder="Hours, eg. 1.5" value={this.state.hours}
                  onChange={this.handleChange('hours')} step="0.01" min="0"
                />
              </div>
              <div className="col-sm-2">
                <input type="text" className="form-control" placeholder="Optional comment" value={this.state.comment}
                  onChange={this.handleChange('comment')}
                />
              </div>
              <div className="col-sm-2">
                <input type="submit" className="form-control btn-success" value="Register work"/>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
