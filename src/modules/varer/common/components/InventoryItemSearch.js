import {toImmutable} from 'nuclear-js'
import reqwest from 'reqwest'
import React from 'react'
import Autosuggest from 'react-autosuggest'
import {api} from '../../../../api'

import theme from '!style-loader!css-loader?modules!./InventoryItemSearch.scss'
theme.input = 'form-control'

import ProductName from './ProductName'

function renderSuggestion(suggestion) {
  return (
    <ProductName
      product={toImmutable(suggestion)}
      isInventory={true}/>
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
    this.handleChange = this.handleChange.bind(this)

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
        suggestions: result.results
      })
    })
  }

  onSuggestionSelected(event, {suggestion, suggestionValue, method}) {
    this.props.onSelect(toImmutable(suggestion))
    console.log('select')
  }

  handleChange(event, {newValue}) {
    this.setState({value: newValue})
    this.props.onSelect(null)
    console.log('change')
  }

  render() {
    const inputProps = {
      placeholder: 'Find inventory item',
      value: this.state.value,
      onChange: this.handleChange
    }

    return (
      <Autosuggest suggestions={this.state.suggestions}
        onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
        onSuggestionSelected={this.onSuggestionSelected}
        getSuggestionValue={sug => sug.navn}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        theme={theme}/>
    )
  }
}
