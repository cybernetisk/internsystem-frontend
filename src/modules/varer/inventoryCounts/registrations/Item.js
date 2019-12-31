import React from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'nuclear-js-react-addons-chefsplate'
import {admin} from '../../../../api'

import {addVare} from '../service'

import * as actions from '../actions'

import Loader from '../../../../components/Loader'
import NewCount from './NewCount'
import List from './List'

import './Item.scss'

import {
  data,
  isLoading,
  error,
} from './getters'

import {
  isLoggedIn,
} from '../../../auth/getters'

export default
@connect(props => ({
  data,
  isLoading,
  error,
  isLoggedIn,
}))
class Item extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    actions.fetchInventoryCountSimple(this.props.match.params.id)
    actions.fetchInventoryCountCounts(this.props.match.params.id)
  }

  renderComment(data) {
    if (data.get('kommentar')) {
      return (
        <div className="varer-inventoryCountReg-item-comment">
          {data.get('kommentar')}
        </div>
      )
    }
  }

  renderNewCountForm() {
    if (!this.props.data.get('is_locked')) {
      if (this.props.isLoggedIn) {
        return (
          <NewCount inventoryCountId={this.props.data.get('id')}/>
        )
      }

      return (
        <p className="alert alert-warning">You have to <Link to="auth.login">log in</Link> to register items.</p>
      )
    }
  }

  render() {
    if (this.props.isLoading || this.props.error) {
      return (
        <Loader isLoading={this.props.isLoading} error={this.props.error}/>
      )
    }

    return (
      <div>
        <div className="pull-right hidden-print">
          <a className="btn btn-default" href={admin(`varer/varetelling/${this.props.data.get('id')}/`)} target="_self">Edit</a>
          {' '}
          <Link to={`/varer/inventorycount/${this.props.data.get('id')}`}
            className="btn btn-default"
          >
            Show detailed view
          </Link>
        </div>

        <h1>{this.props.data.get('tittel')}</h1>
        {this.renderComment(this.props.data)}

        {this.renderNewCountForm()}
        <List />
      </div>
    )
  }
}
