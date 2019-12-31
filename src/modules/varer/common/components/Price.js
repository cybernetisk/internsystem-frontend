import {toImmutable} from 'nuclear-js'
import PropTypes from 'prop-types';
import React from 'react'

import {price} from '../../../../services/FormatService'
import {getInPrices} from '../../inventoryItems/service'

import PriceDate from './PriceDate'

import './Price.scss'

const debounceTime = 100

export default class extends React.Component {
  static propTypes = {
    price: PropTypes.number.isRequired,
    priceDate: PropTypes.string,
    priceDateRelativeTo: PropTypes.string,
    pant: PropTypes.number,
    raavareId: PropTypes.number,
  }

  constructor(props) {
    super(props)
    this.state = {
      showHistory: false,
      history: null,
      isHistoryLoading: false,
    }
    this.debounceTimer = null

    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
  }

  loadHistory() {
    this.setState({
      isHistoryLoading: true
    })

    getInPrices(this.props.raavareId).then(response => {
      this.setState({
        history: toImmutable(response),
        isHistoryLoading: false,
      })
    })
  }

  handleMouseEnter(event) {
    if (this.props.raavareId) {
      this.debounceTimer = setTimeout(() => {
        this.setState({
          showHistory: true,
        })

        if (this.state.history === null && !this.state.isHistoryLoading) {
          this.loadHistory()
        }
      }, this.state.history !== null ? 0 : debounceTime)
    }
  }

  handleMouseLeave(event) {
    if (this.props.raavareId) {
      clearTimeout(this.debounceTimer)
      this.setState({
        showHistory: false
      })
    }
  }

  renderHistory() {
    if (this.state.showHistory && this.state.history && this.state.history.size > 0) {
      return (
        <div className="varer-price-history">
          {this.state.history.map(item => {
            return (
              <div key={item.get('id')} className="varer-price-history-item">
                <span>{item.get('aktiv') ? '' : 'Invalid'}</span>
                <span>{item.get('dato')}</span>
                <span>{price(item.get('pris') / item.get('antall'))}</span>
                <span>{price(item.get('pant') / item.get('antall'))}</span>
                <span>{item.getIn(['leverandor', 'navn'])}</span>
                <span>{item.get('type')}</span>
              </div>
            )
          })}
        </div>
      )
    }
  }

  render() {
    let pant
    if (this.props.pant) {
      pant = (
        <span className="varer-price-pant">
          <br/>
          + {price(this.props.pant)} i pant
        </span>
      )
    }

    let priceDate
    if (this.props.priceDate) {
      priceDate = (
        <span>
          <br />
          <PriceDate dato={this.props.priceDate} relativeTo={this.props.priceDateRelativeTo}/>
        </span>
      )
    }

    return (
      <span className="varer-price-buyPrice" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
        {price(this.props.price)}
        {pant}
        {priceDate}
        {this.renderHistory()}
      </span>
    )
  }
}
