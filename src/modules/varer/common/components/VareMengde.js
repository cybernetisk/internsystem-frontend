import PropTypes from "prop-types"
import React from "react"
import { antall } from "../../../../services/FormatService"

export default class VareMengde extends React.Component {
  static propTypes = {
    verdi: PropTypes.number.isRequired,
    enhet: PropTypes.string,
  }

  render() {
    let verdi = this.props.verdi
    const enhet = this.props.enhet

    verdi = antall(verdi)

    return <span>{verdi + (enhet ? " " + enhet : "")}</span>
  }
}
