import './List.scss'

import React from 'react'
import { nuclearComponent } from 'nuclear-js-react-addons'

import {fetchInventoryItems, updateFilters} from './actions'
import {
  activePage,
  filters,
  pages,
  inventoryItemsLoader,
  selectGroups,
  filteredInventoryItems,
} from './getters'
import * as consts from '../consts'

import Loader from '../../../components/Loader'
import Pagination from '../../../components/Pagination'
import ListInputQ from './ListInputQ'
import ListTable from './ListTable'

export default
@nuclearComponent({
  activePage,
  selectGroups,
  filters,
  pages,
  inventoryItems: filteredInventoryItems,
  inventoryItemsLoader
})
class List extends React.Component {

  static propTypes = {
    query: React.PropTypes.object.isRequired
  }

  static contextTypes = {
    router: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleGroupChange = this.handleGroupChange.bind(this)
    this.handleOutdatedChange = this.handleOutdatedChange.bind(this)
  }

  componentDidMount() {
    fetchInventoryItems(this.props.query.page || 1)

    // timeout is needed because this is done after getting initial state but before adding observer
    // the timeout causes the observer to be added first
    setTimeout(() => {
      updateFilters({
        text: this.props.query.q || '',
        group: parseInt(this.props.query.group) || null
      })
    })
  }

  componentWillReceiveProps(newProps) {
    if (newProps.query.q != this.props.query.q
      || newProps.query.group != this.props.query.group
      || newProps.query.outdated != this.props.query.outdated) {
      let outdated = newProps.query.outdated
      if (typeof outdated === 'undefined' || !consts.outdatedOptions.has(newProps.query.outdated)) {
        outdated = consts.outdatedOptionsDefault
      }

      updateFilters({
        text: newProps.query.q || '',
        group: parseInt(newProps.query.group) || null,
        outdated
      })
    }

    if (newProps.query.page != this.props.query.page) {
      fetchIventoryItems(newProps.query.page || 1)
    }
  }

  handleSearch(e) {
    updateFilters({text: e.target.value})
    this.updateQuery('q', e.target.value !== '' ? e.target.value : undefined)
  }

  handleGroupChange(e) {
    let group = parseInt(e.target.value) || null
    updateFilters({group})
    this.updateQuery('group', group)
  }

  handleOutdatedChange(e) {
    let outdated = e.target.value
    updateFilters({outdated})

    if (outdated === consts.outdatedOptionsDefault) {
      outdated = undefined
    }

    this.updateQuery('outdated', outdated)
  }

  handlePageChange(newPage) {
    fetchIventoryItems(newPage)

    let page = newPage !== 1 ? newPage : undefined
    this.updateQuery('page', page)
  }

  updateQuery(name, value) {
    if (value === null) {
      value = undefined
    }

    let query = this.context.router.getCurrentQuery()
    query[name] = value

    this.context.router.transitionTo(
      this.context.router.getCurrentPathname(),
      this.context.router.getCurrentParams(),
      query
    )
  }

  renderInventoryItems() {
    return (
      <div>
        <div className="row">
          <div className="form-group col-md-6">
            <label>Search</label>
            <ListInputQ autofocus={true} onChange={this.handleSearch} value={this.props.filters.get('text')}/>
          </div>

          <div className="form-group col-md-3">
            <label>Group</label>
            <select className="form-control" onChange={this.handleGroupChange}
              value={this.props.filters.get('group', '')}>
              <option value={null}>-- not selected --</option>
              {this.props.selectGroups.map(parentGroup => (
                <optgroup label={parentGroup.first().get('gruppe')}>
                  {parentGroup.map(group => (
                    <option value={group.get('id')}>{group.get('navn')}</option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          <div className="form-group col-md-3">
            <label>Outdated products</label>
            <select className="form-control" onChange={this.handleOutdatedChange}
              value={this.props.filters.get('outdated', '')}>
              {consts.outdatedOptions.map((option, key) => (
                <option value={key}>{option.get('text')}</option>
              ))}
            </select>
          </div>
        </div>

        {this.props.inventoryItems.count()
          ? <ListTable inventoryItems={this.props.inventoryItems}/>
          : <p>No items matched search criteria.</p>}

        {this.props.pages > 1
          ? <Pagination pages={this.props.pages} active={this.props.activePage} onChange={this.handlePageChange}/>
          : ''}
      </div>
    )
  }

  render() {
    return (
      <div className="råvarer-index">
        <h1>Inventory items</h1>

        <Loader {...this.props.inventoryItemsLoader}>No inventory items exist.</Loader>

        {!this.props.inventoryItemsLoader.isEmpty ? this.renderInventoryItems() : ''}
      </div>
    )
  }
}
