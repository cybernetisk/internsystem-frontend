import theme from "!style-loader!css-loader?modules!sass-loader!./InventoryItemSearch.theme.scss"
import { toImmutable } from "nuclear-js"
import PropTypes from "prop-types"
import React from "react"
import Autosuggest from "react-autosuggest"
import { api } from "../../../../api"
import reqwest from "../../../../utils/reqwest"
import { fillBuyPrice } from "../../inventoryItems/service"
import BuyPrice from "./BuyPrice"
import "./InventoryItemSearch.scss"
import ProductName from "./ProductName"
import Quantity from "./Quantity"

theme.input = "form-control"

function renderSuggestion(product) {
  return (
    <div className="varer-inventoryItemSearch--suggestion">
      <ProductName
        product={product}
        showLinks={false}
        isInventory={true}
        showAccountGroup={true}
      />
      <Quantity product={product} />
      <BuyPrice product={product} />
    </div>
  )
}

export default class InventoryItemSearch extends React.Component {
  static propTypes = {
    onSelect: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      suggestions: [],
      value: "",
    }
  }

  onSuggestionsFetchRequested = ({ value }) => {
    reqwest({
      url: api("varer/råvarer"),
      data: {
        search: value,
        limit: 10,
      },
      type: "json",
    }).then(result => {
      this.setState({
        suggestions: result.results.map(product =>
          fillBuyPrice(toImmutable(product)),
        ),
      })
    })
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    })
  }

  onSuggestionSelected = (event, { suggestion }) => {
    this.props.onSelect(suggestion)
    event.preventDefault()
  }

  getSuggestionValue = product => {
    this.props.onSelect(product)
    return product.get("navn")
  }

  handleChange = (event, x) => {
    this.setState({ value: x.newValue })

    if (x.method !== "up" && x.method !== "down") {
      this.props.onSelect(null)
    }
  }

  clear = () => {
    this.setState({ value: "" })
    this.props.onSelect(null)
  }

  render() {
    const inputProps = {
      placeholder: "Find inventory item",
      value: this.state.value,
      onChange: this.handleChange,
    }

    return (
      <span className="varer-inventoryItemSearch">
        <Autosuggest
          suggestions={this.state.suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          onSuggestionSelected={this.onSuggestionSelected}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          theme={theme}
        />
      </span>
    )
  }
}
