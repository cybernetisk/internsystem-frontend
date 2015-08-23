import './List.scss'

import React from 'react'
import { nuclearComponent } from 'nuclear-js-react-addons'

import {fetchSalesProducts, updateFilters} from './actions'
import {
  activePage,
  filters,
  pages,
  salesProductsLoader,
  selectGroups,
  filteredSalesProducts,
} from './getters'

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
  salesProducts: filteredSalesProducts,
  salesProductsLoader
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
  }

  componentDidMount() {
    fetchSalesProducts(this.props.query.page || 1)

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
    if (newProps.query.q != this.props.query.q || newProps.query.group != this.props.query.group) {
      updateFilters({
        text: newProps.query.q || '',
        group: parseInt(newProps.query.group) || null
      })
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

  handlePageChange(newPage) {
    fetchSalesProducts(newPage)

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

  renderSalesProducts(salesProducts) {
    return (
      <div>
        <div className="row">
          <div className="form-group col-md-8">
            <label>Search</label>
            <ListInputQ autofocus={true} onChange={this.handleSearch} value={this.props.filters.get('text')}/>
          </div>

          <div className="form-group col-md-4">
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
        </div>

        {salesProducts.length
          ? <ListTable salesProducts={salesProducts}/>
          : <p>No products matched search criteria.</p>}

        {this.props.pages > 1
          ? <Pagination pages={this.props.pages} active={this.props.activePage} onChange={this.handlePageChange}/>
          : ''}
      </div>
    )
  }

  render() {
    let salesProducts = this.props.salesProducts.toJS()

    return (
      <div className="salgsvarer-index">
        <h1>Sales products</h1>

        <Loader {...this.props.salesProductsLoader}>No sales products exist.</Loader>

        {!this.props.salesProductsLoader.isEmpty ? this.renderSalesProducts(salesProducts) : ''}
      </div>
    )
  }
}
