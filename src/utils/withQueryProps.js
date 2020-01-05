import PropTypes from "prop-types"
import queryString from "query-string"
import React from "react"

export default function withQueryProps(WrappedComponent) {
  return class WithQueryProps extends React.Component {
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
