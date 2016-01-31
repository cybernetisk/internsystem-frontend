import React from 'react'

export default class extends React.Component {
  static propTypes = {
    dato: React.PropTypes.string.isRequired,
    relativeTo: React.PropTypes.string,
  }

  static defaultProps = {
    relativeTo: null,
  }

  render() {
    let relativeTo = this.props.relativeTo ? new Date(this.props.relativeTo) : new Date

    let days = (relativeTo - (new Date(this.props.dato))) / 86400000
    let theClass

    if (days < 0)
      theClass = 'prisdato-error'
    //else if (this.dato == '2000-01-01')
    //    theClass = 'prisdato-static'
    else if (days < 30)
      theClass = 'prisdato-age1'
    else if (days < 100)
      theClass = 'prisdato-age2'
    else if (days < 180)
      theClass = 'prisdato-age3'
    else if (days < 300)
      theClass = 'prisdato-age4'
    else if (days < 400)
      theClass = 'prisdato-age5'
    else
      theClass = 'prisdato-age6'

    return (
      <span className={'prisdato ' + theClass}>
        {this.props.dato}
      </span>
    )
  }
}
