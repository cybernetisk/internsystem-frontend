import { voucherService } from "modules/voucher/service"
import React, { useEffect, useState } from "react"
import Autosuggest from "react-autosuggest"
import { useApiFetcher } from "utils/api"
import { Workgroup } from "../types"
import theme from "./autosuggest.module.scss"

theme.input = "form-control"

function escapeRegexCharacters(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

function getSuggestions(value: string, list: Workgroup[]) {
  const escapedValue = escapeRegexCharacters(value.trim())

  if (escapedValue === "") {
    return list
  }

  const regex = new RegExp("^" + escapedValue, "i")

  return list.filter((group) => regex.test(group.work_group))
}

export const WorkGroupInput = (props: {
  value: string
  onChange(value: string): void
  onKeyDown?(event: React.KeyboardEvent<HTMLInputElement>): void
}) => {
  const workGroups = useApiFetcher(voucherService.getWorkGroups)
  const [suggestions, setSuggestions] = useState<Workgroup[]>([])

  const updateSuggestions = (value: string) => {
    if (workGroups == null) return
    setSuggestions(getSuggestions(value, workGroups))
  }

  // Either we received data or value is changed.
  useEffect(() => {
    updateSuggestions(props.value)
  }, [workGroups, props.value])

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={({ value }) => {
        updateSuggestions(value)
      }}
      onSuggestionsClearRequested={() => {
        setSuggestions([])
      }}
      getSuggestionValue={(sug) => sug.work_group}
      renderSuggestion={(suggestion) => <span>{suggestion.work_group}</span>}
      shouldRenderSuggestions={() => true}
      inputProps={{
        ...props,
        placeholder: "Work group",
        onChange: (event, { newValue }) => props.onChange(newValue),
      }}
      theme={theme}
    />
  )
}
