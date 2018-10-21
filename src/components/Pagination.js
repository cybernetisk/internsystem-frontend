import PropTypes from 'prop-types';
import React from 'react'

export default class extends React.Component {

  static propTypes = {
    active: PropTypes.number.isRequired,
    pages: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
  }

  handleChange(event, newValue) {
    event.preventDefault()

    if (newValue != this.props.active && newValue >= 1 && newValue <= this.props.pages) {
      this.props.onChange(newValue)
    }
  }

  render() {
    return (
      <div className="text-center">
        <ul className="pagination">
          <li><a href="#" onClick={event => this.handleChange(event, 1)}>&laquo;</a></li>
          <li><a href="#" onClick={event => this.handleChange(event, this.props.active-1)}>&lsaquo;</a></li>
          <li><a>{this.props.active}/{this.props.pages}</a></li>
          <li><a href="#" onClick={event => this.handleChange(event, this.props.active+1)}>&rsaquo;</a></li>
          <li><a href="#" onClick={event => this.handleChange(event, this.props.pages)}>&raquo;</a></li>
        </ul>
      </div>
    )
  }
}
