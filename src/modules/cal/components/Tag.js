import PropTypes from 'prop-types';
import React from 'react'
import './Tag.scss'

export default class extends React.Component {

  static propTypes = {
    text: PropTypes.string.isRequired
  }

  static defaultProps = {
    type: 'normal',
    text: 'unknown',
  }

  render() {
    return <span className={'eventlist-tag is-'+this.props.type}>{this.props.text}</span>
  }
}
