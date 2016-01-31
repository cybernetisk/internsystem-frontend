import React from 'react'
import {Link} from 'react-router'
import {connect} from 'nuclear-js-react-addons'

import {addVare} from '../service'

import * as actions from '../actions'

import Loader from '../../../../components/Loader'
import NewCount from './NewCount'
import List from './List'

import {
  data,
  isLoading,
  error,
} from './getters'

@connect(props => ({
  data,
  isLoading,
  error,
}))
export default class Item extends React.Component {

  static contextTypes = {
    router: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    actions.fetchInventoryCountSimple(this.props.params.id)
    actions.fetchInventoryCountCounts(this.props.params.id)
  }

  renderComment(data) {
    if (data.get('kommentar')) {
      return (
        <div>
          {data.get('kommentar')}
        </div>
      )
    }
  }

  renderNewCountForm() {
    if (!this.props.data.get('is_locked')) {
      return (
        <NewCount inventoryCountId={this.props.data.get('id')}/>
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
          <Link to='varer/inventorycount' params={{id: this.props.data.get('id')}} query={{f: 'counted'}}
            className="btn btn-default">
            Show detailed view
          </Link>
        </div>

        <h1>{this.props.data.get('tittel')}</h1>
        {this.renderComment(this.props.data)}

        <h2>Registrations</h2>
        {this.renderNewCountForm()}
        <List />
      </div>
    )
  }
}
