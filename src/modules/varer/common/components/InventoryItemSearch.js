import {toImmutable} from 'nuclear-js'
import reqwest from '../../../../utils/reqwest'
import React from 'react'
import Autosuggest from 'react-autosuggest'
import {api} from '../../../../api'

import {fillBuyPrice} from '../../inventoryItems/service'

import './InventoryItemSearch.scss'
import theme from '!style-loader!css-loader?modules!sass-loader!./InventoryItemSearch.theme.scss'
theme.input = 'form-control'

import ProductName from './ProductName'
import BuyPrice from './BuyPrice'
import Quantity from './Quantity'

function renderSuggestion(product) {
  return (
    <div className="varer-inventoryItemSearch--suggestion">
      <ProductName
        product={product}
        showLinks={false}
        isInventory={true}
        showAccountGroup={true}/>
      <Quantity product={product}/>
      <BuyPrice product={product}/>
    </div>
  )
}

export default class InventoryItemSearch extends React.Component {
  static propTypes = {
    onSelect: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)

    this.onSuggestionsUpdateRequested = this.onSuggestionsUpdateRequested.bind(this)
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this)
    this.getSuggestionValue = this.getSuggestionValue.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.clear = this.clear.bind(this)

    this.state = {
      suggestions: [],
      value: ''
    }
  }

  onSuggestionsUpdateRequested({ value }) {
    reqwest({
      url: api('varer/råvarer'),
      data: {
        search: value,
        limit: 10
      },
      type: 'json'
    }).then(result => {
      this.setState({
        suggestions: result.results.map(product => fillBuyPrice(toImmutable(product)))
      })
    })
  }

  onSuggestionSelected(event, {suggestion, suggestionValue, method}) {
    this.props.onSelect(suggestion)
    event.preventDefault()
  }

  getSuggestionValue(product) {
    this.props.onSelect(product)
    return product.get('navn')
  }

  handleChange(event, x) {
    this.setState({value: x.newValue})

    if (x.method !== 'up' && x.method !== 'down') {
      this.props.onSelect(null)
    }
  }

  clear() {
    this.setState({value: ''})
    this.props.onSelect(null)
  }

  render() {
    const inputProps = {
      placeholder: 'Find inventory item',
      value: this.state.value,
      onChange: this.handleChange
    }

    return (
      <span className="varer-inventoryItemSearch">
        <Autosuggest
          suggestions={this.state.suggestions}
          onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
          onSuggestionSelected={this.onSuggestionSelected}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          theme={theme}
          ref="autosuggest"/>
      </span>
    )
  }
}
