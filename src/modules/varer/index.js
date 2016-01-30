import './app.scss'

import {Route} from 'react-router'

import Accounts from './accounts'
import InventoryCounts from './varetellinger'
import InventoryItems from './inventoryItems'
import SalesEstimates from './salesEstimates'
import SalesProducts from './salesProducts'
import Vendors from './vendors'

export default (
  <Route>
    {Accounts}
    {InventoryCounts}
    {InventoryItems}
    {SalesEstimates}
    {SalesProducts}
    {Vendors}
  </Route>
)
