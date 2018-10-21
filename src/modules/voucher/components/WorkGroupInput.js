import React from 'react'
import Autosuggest from 'react-autosuggest'
import VoucherService from '../services/VoucherService'

import theme from '!style-loader!css-loader?modules!./autosuggest.scss'
theme.input = 'form-control'

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.work_group}</span>
  )
}

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function getSuggestions(value, list) {
  const escapedValue = escapeRegexCharacters(value.trim())

  if (escapedValue === '') {
    return list
  }

  const regex = new RegExp('^' + escapedValue, 'i')

  return list.filter(group => regex.test(group.work_group))
}

export default class UserInput extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      suggestions: [],
      suggestions_all: []
    }

    VoucherService.getWorkGroups().then(result => {
      this.setState({
        suggestions_all: result,
        suggestions: getSuggestions(this.props.value, result)
      })
    })
  }

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value, this.state.suggestions_all)
    })
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    })
  }

  render() {
    let { onChange, ...inputProps } = this.props
    inputProps.placeholder = 'Work group'
    inputProps.onChange = (event, {newValue}) => onChange(newValue)

    return (
      <Autosuggest
        suggestions={this.state.suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={sug => sug.work_group}
        renderSuggestion={renderSuggestion}
        shouldRenderSuggestions={val => true}
        inputProps={inputProps}
        theme={theme}
      />
    )
  }
}
