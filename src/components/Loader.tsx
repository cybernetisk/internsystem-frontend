import PropTypes from "prop-types"
import React from "react"

interface LoaderProps {
  isLoading?: boolean
  isEmpty?: boolean
  error?: string
}

export default class Loader extends React.Component<LoaderProps> {
  PropTypes = {
    children: PropTypes.node,
    isEmpty: PropTypes.bool,
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.string,
  }

  renderError(error: string) {
    let message
    if (error.length > 0) {
      message = `Error loading data: ${error}`
    } else {
      message = "Unexpected error on loading data."
    }

    return <div className="core-loader is-error">{message}</div>
  }

  renderLoading() {
    return <div className="core-loader is-loading">Loading data ...</div>
  }

  renderEmpty() {
    return (
      <div className="core-loader is-empty">
        {this.props.children || "No data found."}
      </div>
    )
  }

  render() {
    if (this.props.error != null) {
      return this.renderError(this.props.error)
    } else if (this.props.isLoading) {
      return this.renderLoading()
    } else if (this.props.isEmpty) {
      return this.renderEmpty()
    }

    return false
  }
}
