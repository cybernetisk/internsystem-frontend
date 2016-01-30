import React from 'react'
import {Link} from 'react-router'
import {connect} from 'nuclear-js-react-addons'

import {updateQuery} from '../../common/functions'
import moment from '../../../../moment'

import {fetchInventoryCounts} from '../actions'

import Loader from '../../../../components/Loader'
import Pagination from '../../../../components/Pagination'

import {
  list,
  listLoader,
  activePage,
  numPages
} from './getters'

@connect(props => ({
  list,
  listLoader,
  activePage,
  numPages,
}))
export default class List extends React.Component {

  constructor(props) {
    super(props)

    this.updateQuery = updateQuery.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
  }

  componentDidMount() {
    fetchInventoryCounts(this.props.query.page || 1)
  }

  handlePageChange(newPage) {
    fetchList(newPage)

    let page = newPage !== 1 ? newPage : undefined
    this.updateQuery('page', page)
  }

  renderList() {
    return (
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Time</th>
              <th>Comment</th>
              <th>Responsible</th>
            </tr>
          </thead>
          <tbody>
            {this.props.list.map(item => {
              let time = moment(item.get('tid')).format('YYYY-MM-DD HH:mm')

              return (
                <tr>
                  <td><Link to="varer/inventorycount" params={{id: item.get('id')}}>{item.get('tittel')}</Link></td>
                  <td>{time}</td>
                  <td>{item.get('kommentar')}</td>
                  <td>{item.get('ansvarlig')}</td>
                </tr>
              )
            })}
          </tbody>
        </table>

        {this.props.numPages > 1
          ? <Pagination pages={this.props.numPages} active={this.props.activePage} onChange={this.handlePageChange}/>
          : ''}
      </div>
    )
  }

  render() {
    let list = this.props.list.count() ? this.renderList() : ''

    return (
      <div>
        <h1>Inventory counts</h1>

        <Loader {...this.props.listLoader}>No inventory counts exist.</Loader>

        {list}
      </div>
    )
  }
}
