import './app.scss'

import React from 'react'
import {Route} from 'react-router'

import Accounts from './accounts'
import InventoryCounts from './inventoryCounts'
import InventoryItems from './inventoryItems'
import SalesEstimates from './salesEstimates'
import SalesProducts from './salesProducts'
import Vendors from './vendors'

export default (
  <React.Fragment>
    {Accounts}
    {InventoryCounts}
    {InventoryItems}
    {SalesEstimates}
    {SalesProducts}
    {Vendors}
  </React.Fragment>
)
