import React from 'react'
import Autosuggest from 'react-autosuggest'
import VoucherService from '../services/VoucherService'

import theme from '!style-loader!css-loader?modules!./autosuggest.scss'
theme.input = 'form-control'

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.username} ({suggestion.realname})</span>
  )
}

export default class UserInput extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      suggestions: []
    }
  }

  onSuggestionsFetchRequested = ({ value }) => {
    VoucherService.getUsers(value).then(result => {
      this.setState({
        suggestions: result.results
      })
    })
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    })
  }

  render() {
    const inputProps = {
      placeholder: 'UiO-username',
      value: this.props.value,
      onChange: (event, {newValue}) => this.props.onChange(newValue)
    }

    return (
      <Autosuggest
        suggestions={this.state.suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={sug => sug.username}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        theme={theme}
      />
    )
  }
}
