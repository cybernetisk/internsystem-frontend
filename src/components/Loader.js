import React from 'react'

export default class Loader extends React.Component {

  PropTypes = {
    children: React.PropTypes.node,
    isEmpty: React.PropTypes.bool,
    isLoading: React.PropTypes.bool.isRequired,
    error: React.PropTypes.string
  }

  renderError() {
    let message
    if (this.props.error.length > 0) {
      message = `Error loading data: ${this.props.error}`
    } else {
      message = 'Unexpected error on loading data.'
    }

    return (
      <div className='core-loader is-error'>
        {message}
      </div>
    )
  }

  renderLoading() {
    return (
      <div className='core-loader is-loading'>
        Loading data ...
      </div>
    )
  }

  renderEmpty() {
    return (
      <div className='core-loader is-empty'>
        {this.props.children || 'No data found.'}
      </div>
    )
  }

  render() {
    if (this.props.error !== null) {
      return this.renderError()
    } else if (this.props.isLoading) {
      return this.renderLoading()
    } else if (this.props.isEmpty) {
      return this.renderEmpty()
    }

    return false
  }
}
