import { voucherService } from "modules/voucher/service"
import React, { useState } from "react"
import Autosuggest from "react-autosuggest"
import { UserSimple } from "types"
import theme from "./autosuggest.module.scss"

theme.input = "form-control"

function renderSuggestion(suggestion: UserSimple) {
  return (
    <span>
      {suggestion.username} ({suggestion.realname})
    </span>
  )
}

export const UserInput = ({
  value,
  onChange,
}: {
  value: string
  onChange(value: string): void
}) => {
  const [suggestions, setSuggestions] = useState<UserSimple[]>([])

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={({ value }) => {
        voucherService.getUsers(value).then(result => {
          setSuggestions(result.results)
        })
      }}
      onSuggestionsClearRequested={() => setSuggestions([])}
      getSuggestionValue={sug => sug.username}
      renderSuggestion={renderSuggestion}
      inputProps={{
        placeholder: "UiO-username",
        value,
        onChange: (event, { newValue }) => onChange(newValue),
      }}
      theme={theme}
    />
  )
}
