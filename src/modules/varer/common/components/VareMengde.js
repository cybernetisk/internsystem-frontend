import React from 'react'
import {antall} from '../../../../services/FormatService'

export default class VareMengde extends React.Component {
  static propTypes = {
    verdi: React.PropTypes.number.isRequired,
    enhet: React.PropTypes.string
  }

  render() {
    let verdi = this.props.verdi
    let enhet = this.props.enhet

    verdi = antall(verdi)

    return (
      <span>{verdi + (enhet ? ' ' + enhet : '')}</span>
    )
  }
}

angular.module('cyb.varer').factory('VareMengde', () => {
  return VareMengde
})
