import React from 'react'

export default class extends React.Component {

  static propTypes = {
    onChange: React.PropTypes.func.isRequired,
    autofocus: React.PropTypes.bool,
    value: React.PropTypes.string.isRequired,
  }

  componentDidMount() {
    if (this.props.autofocus) {
      React.findDOMNode(this.refs.input).focus()
    }
  }

  render() {
    return (
      <input className="form-control" type="text" value={this.props.value} onChange={this.props.onChange} ref="input"/>
    )
  }
}
