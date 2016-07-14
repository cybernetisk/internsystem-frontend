import React from 'react'
import Autosuggest from 'react-autosuggest'
import InternService from '../services/InternService'

import theme from '!style-loader!css-loader?modules!./autosuggest.scss'
theme.input = 'form-control'

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.user.username} ({suggestion.user.realname})</span>
  )
}


export default class Intern extends React.Component {
  constructor(props) {
    super(props)

    this.onSuggestionsUpdateRequested = this.onSuggestionsUpdateRequested.bind(this)

    this.state = {
      suggestions: []
    }
  }

  onSuggestionsUpdateRequested({ value }) {
    InternService.getInterns(1, 10, value).then(result => {
      this.setState({
        suggestions: result.results
      })
    })
  }

  render() {
    const inputProps = {
      placeholder: 'UiO-username',
      value: this.props.value,
      onChange: (event, {newValue}) => this.props.onChange(newValue)
    }

    return (
      <Autosuggest suggestions={this.state.suggestions}
        onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
        getSuggestionValue={sug => sug.user.username}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        theme={theme}
      />
    )
  }
}
