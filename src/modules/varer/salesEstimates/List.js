import React from 'react'
import {connect} from 'nuclear-js-react-addons-chefsplate'

import {fetchSalesEstimates} from './actions'
import {salesEstimates} from './getters'

import Loader from '../../../components/Loader'

export default
@connect(props => ({
  salesEstimates
}))
class List extends React.Component {

  componentDidMount() {
    fetchSalesEstimates()
  }

  renderList(estimates) {
    return (
      <div>
        <ul>
          {estimates.map((estimate) => (
            <li key={estimate.id}>
              <a href={`admin/varer/salgskalkyle/${estimate.id}/`} target="_self">
                {estimate.navn}
              </a> ({estimate.dato})
            </li>
          ))}
        </ul>
      </div>
    )
  }

  render() {
    let salesEstimates = this.props.salesEstimates.get('items').toJS()

    return (
      <div>
        <h1>Sales estimates</h1>

        <Loader
          isLoading={this.props.salesEstimates.get('isLoading')}
          error={this.props.salesEstimates.get('error')}
          isEmpty={this.props.salesEstimates.get('items').isEmpty()}
        >
          No sales estimates exist.
        </Loader>

        {salesEstimates.length ? this.renderList(salesEstimates) : ''}
      </div>
    )
  }
}
