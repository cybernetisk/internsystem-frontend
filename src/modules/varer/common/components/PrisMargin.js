import React from 'react'
import angularModule from '../../angularModule'
import {price} from '../../../../services/FormatService'

export default class PrisMargin extends React.Component {
  static propTypes = {
    innPris: React.PropTypes.number.isRequired,
    utPris: React.PropTypes.number.isRequired,
    utMva: React.PropTypes.number.isRequired
  }

  render() {
    let eksmva = this.props.utPris / (1 + this.props.utMva / 100);
    let margin = (((eksmva - this.props.innPris) / eksmva) * 100);
    let theClass;

    if (margin > 150)
      theClass = 'prismargin-veryhigh';
    else if (margin > 100)
      theClass = 'prismargin-higher';
    else if (margin > 50)
      theClass = 'prismargin-high';
    else if (margin > 20)
      theClass = 'prismargin-ok';
    else if (margin > 10)
      theClass = 'prismargin-low';
    else if (margin < 0)
      theClass = 'prismargin-subzero';
    else
      theClass = 'prismargin-verylow';

    margin = margin.toFixed(1).toString().replace('.', ',');

    return (
      <span className={'prismargin ' + theClass}>
        {margin} %
        <span className="prismargin-kr"> ({price(eksmva - this.props.innPris, 2)})</span>
      </span>);
  }
}

angularModule.value('PrisMargin', PrisMargin)
