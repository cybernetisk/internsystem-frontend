import React from 'react'
import {admin} from '../../../../api'

import './Account.scss'

export default class extends React.Component {
  static propTypes = {
    account: React.PropTypes.object.isRequired,
    showLinks: React.PropTypes.bool,
    showGroup: React.PropTypes.bool,
  }

  static defaultProps = {
    showLinks: true,
    showGroup: false,
  }

  renderGroup() {
    if (this.props.showGroup) {
      return `${this.props.account.get('gruppe')}: `
    }
  }

  renderName() {
    if (!this.props.showLinks) {
      return this.props.account.get('navn')
    }

    return (
      <a className="varer-accountLink" href={admin(`varer/konto/${this.props.account.get('id')}/`)}>
        {this.props.account.get('navn')}
      </a>
    )
  }

  render() {
    return (
      <span>
        {this.renderGroup()}
        <span className="varer-account">
          {this.renderName()}
        </span>
      </span>
    )
  }
}
