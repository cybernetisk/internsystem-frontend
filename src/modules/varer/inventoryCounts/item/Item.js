import React from 'react'
import {Link} from 'react-router'
import {connect} from 'nuclear-js-react-addons'
import Immutable from 'immutable'

import moment from '../../../../moment'
import {price} from '../../../../services/FormatService'
import {updateQuery} from '../../common/functions'

import * as consts from '../../consts'

import {addVare} from '../service'

import * as actions from '../actions'
import * as inventoryItemsActions from '../../inventoryItems/actions'

import Loader from '../../../../components/Loader'
import AccountFilter from '../../common/components/AccountFilter'
import ListInputQ from '../../common/components/TextInput'
import ItemListView from './List'
import GroupsList from './GroupsList'

import {
  inventoryCountStore,
  accountsForSelectElement,
  filters,
  totalSummer,
  totalSummerFiltered,
} from './getters'

@connect(props => ({
  data: inventoryCountStore,
  accountsForSelectElement,
  filters,
  totalSummer,
  totalSummerFiltered,
}))
export default class Item extends React.Component {

  static contextTypes = {
    router: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      newitems: Immutable.Map(),
      newitem_place: ''
    }

    this.addNewItem = this.addNewItem.bind(this)
    this.updateQuery = updateQuery.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleGroupChange = this.handleGroupChange.bind(this)
    this.handleVisibleChange = this.handleVisibleChange.bind(this)
  }

  componentDidMount() {
    actions.fetchInventoryCount(this.props.params.id)
    inventoryItemsActions.fetchInventoryItems(1)

    // timeout is needed because this is done after getting initial state but before adding observer
    // the timeout causes the observer to be added first
    setTimeout(() => {
      actions.updateFilters({
        text: this.props.query.q || '',
        group: parseInt(this.props.query.group) || null,
        f: this.props.query.f || this.props.filters.get('f')
      })
    })
  }

  componentWillReceiveProps(newProps) {
    if (newProps.query.q != this.props.query.q
      || newProps.query.group != this.props.query.group
      || newProps.query.f != this.props.query.f) {
      let f = newProps.query.f
      if (typeof f === 'undefined' || !consts.inventoryCountOptions.has(newProps.query.f)) {
        f = consts.inventoryCountOptionsDefault
      }

      actions.updateFilters({
        text: newProps.query.q || '',
        group: parseInt(newProps.query.group) || null,
        f
      })
    }
  }

  handleSearch(e) {
    actions.updateFilters({text: e.target.value})
    this.updateQuery('q', e.target.value !== '' ? e.target.value : undefined)
  }

  handleGroupChange(e) {
    let group = e.target.value
    if (group === '0') {
      group = null
    } else if (parseInt(group) + '' == group) {
      group = parseInt(group)
    }

    actions.updateFilters({group})
    this.updateQuery('group', group)
  }

  handleVisibleChange(e) {
    let f = e.target.value
    actions.updateFilters({f})

    if (f === consts.inventoryCountOptionsDefault) {
      f = undefined
    }

    this.updateQuery('f', f)
  }

  addNewItem(raavare) {
    let newItem = {
      antall: '',
      antallpant: '',
      kommentar: '',
      sted: this.state.newitem_place,
      removeHandle: () => {
        let newitems = this.state.newitems.updateIn([raavare.get('id')], items => items.filter(item => item != newItem))
        if (newitems.get(raavare.get('id')).size == 0) {
          newitems = newitems.delete(raavare.get('id'))
        }

        this.setState({
          newitems
        })

        this.refs.frisok.refs.input.select()
      },
      storeHandle: data => {
        console.log('storeHandle', data)
        data.raavare = raavare.get('id')
        data.varetelling = this.props.data.get('data').get('id')

        this.setState({
          newitem_place: data.sted
        })

        addVare(data).then(res => {
          actions.vareAdded(this.props.data.get('data').get('id'), res)
          this.refs.frisok.refs.input.select()
          newItem.removeHandle()
        }, err => {
          alert(err.responseText)
        })
      },
      changeHandleBind: field => event => {
        // we actually modify the state directly here and not through setState
        newItem[field] = event.target.value
        this.forceUpdate()
      }
    }

    this.setState({
      newitems: this.state.newitems
        .set(raavare.get('id'), this.state.newitems.get(raavare.get('id'), Immutable.List()).push(newItem))
    })
  }

  renderList() {
    let itemList = null
    let groupsList = null
    if (this.props.filters.get('f') == 'groupsonly') {
      return (
        <GroupsList />
      )
    } else {
      return (
        <ItemListView
          newItem={this.addNewItem}
          newitems={this.state.newitems}
        />
      )
    }
  }

  render() {
    if (this.props.data.get('isLoading') || this.props.data.get('error')) {
      return (
        <Loader isLoading={this.props.data.get('isLoading')} error={this.props.data.get('error')}/>
      )
    }

    let item = this.props.data.get('data').toJS()

    let summer = this.props.totalSummer.toJS()
    let summerFiltered = this.props.totalSummerFiltered.toJS()
    const showFilteredSummer = summer.count != summerFiltered.count

    return (
      <div className="varetellinger-item">
        <div className="pull-right hidden-print">
          <a className="btn btn-default" href={`admin/varer/varetelling/${item.id}/`} target="_self">Edit</a>
          {' '}
          <Link to="varer/inventorycount/registrations" params={{id: this.props.data.get('id')}}
            className="btn btn-default"
          >
            Show registrations view
          </Link>
        </div>

        <h1>Inventory count</h1>

        <dl className="dl-horizontal">
          <dt>Title</dt>
          <dd>{item.tittel}</dd>
          <dt>Time</dt>
          <dd>{moment(item.tid).format('YYYY-MM-DD HH:mm')}</dd>
          {item.kommentar ? [
            <dt>Comment</dt>,
            <dd>{item.kommentar}</dd>
          ] : ''}
          <dt>Responsible</dt>
          <dd>{item.ansvarlig}</dd>
          {summer ? [
            <dt>Total value (ex. VAT)</dt>,
            <dd>{price(summer.sum + summer.pant)} ({price(summer.sum)} + {price(summer.pant)} i pant)</dd>
          ] : ''}
          {showFilteredSummer ? [
            <dt>By search filter</dt>,
            <dd>{price(summerFiltered.sum + summerFiltered.pant)} ({price(summerFiltered.sum)} + {price(summerFiltered.pant)} i pant)</dd>
          ] : ''}
        </dl>

        <h2>Products</h2>

        <p className="text-muted hidden-print">
          Press ctrl+down or ctrl+up to move focus. Press + to quicky add new count.
        </p>

        <div className="row hidden-print">
          <div className="form-group col-md-6">
            <label>Search</label>
            <ListInputQ autofocus={true} onChange={this.handleSearch} value={this.props.filters.get('text')}
              ref="frisok"
            />
          </div>
          <div className="form-group col-md-3">
            <label>Group</label>
            <AccountFilter onChange={this.handleGroupChange} value={this.props.filters.get('group', '')}
              accounts={this.props.accountsForSelectElement}
            />
          </div>
          <div className="form-group col-md-3">
            <label>Filtering</label>
            <select className="form-control" onChange={this.handleVisibleChange}
              value={this.props.filters.get('f', '')}
            >
              {consts.inventoryCountOptions.map((option, key) => (
                <option value={key} key={key}>{option.get('text')}</option>
              ))}
            </select>
          </div>
        </div>

        {this.renderList()}
      </div>
    )
  }
}
