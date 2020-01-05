import PropTypes from "prop-types"
import React from "react"

export default class TextInput extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    autofocus: PropTypes.bool,
    value: PropTypes.string.isRequired,
  }

  componentDidMount() {
    if (this.props.autofocus) {
      this.input.focus()
    }
  }

  render() {
    return (
      <input
        className="form-control"
        type="text"
        value={this.props.value}
        onChange={this.props.onChange}
        ref={elm => {
          this.input = elm
        }}
      />
    )
  }
}
