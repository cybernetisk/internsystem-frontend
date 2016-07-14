import React from 'react'
import Autosuggest from 'react-autosuggest'

import {connect} from 'nuclear-js-react-addons'
import InternService from '../services/InternService'
import InternInput from './InternInput'

import getters from '../getters'
import * as actions from '../actions'

@connect(props => ({
  roles: getters.roles,
}))
export default class AddIntern extends React.Component {
  componentDidMount() {
    actions.getRoles()
  }

  constructor(props) {
    super(props)
    this.handleSave = this.handleSave.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      isSending: false,
      roleId: '',
      username: ''
    }
  }

  handleSave(e) {
    e.preventDefault()
    if (this.state.isSending) {
      return
    }

    this.setState({isSending: true})
    InternService.addRoleToIntern(this.state.username, this.state.roleId).then(result => {
      this.setState({
        isSending: false,
        roleId: '',
        username: ''
      })
    })
  }

  handleChange(field) {
    return event => {
      this.setState({[field]: event.target ? event.target.value : event})
    }
  }

  render() {
    if (this.props.roles.get('isLoading')) {
      return (
        <div>Loading...</div>
      )
    }
    return (
      <div className="panel panel defaul">
        <div className="panel-heading">
          Register intern
        </div>
        <div className="panel-body">
          <form className="form-inline" onSubmit={this.handleSave}>
            <div className="form-group">
              <InternInput value={this.state.username} onChange={this.handleChange('username')}/>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
