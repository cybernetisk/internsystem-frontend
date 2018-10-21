import queryString from 'query-string'
import React from 'react'
import PropTypes from 'prop-types'

export default function withQueryProps(WrappedComponent) {
  return class extends React.Component {
    static propTypes = {
      location: PropTypes.shape({
        search: PropTypes.string,
      }).isRequired,
    }

    render() {
      const query = queryString.parse(this.props.location.search)
      return <WrappedComponent {...this.props} query={query} />
    }
  }
}
