import PropTypes from 'prop-types';
import React from 'react'

import Loader from './Loader'

export default class PageLoader extends React.Component {

  PropTypes = {
    children: PropTypes.node,
    error: PropTypes.string,
    isEmpty: PropTypes.bool,
    isLoading: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired
  }

  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        {this.props.children}
        <Loader {...this.props} />
      </div>
    )
  }
}
