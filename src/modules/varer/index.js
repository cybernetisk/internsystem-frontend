import './app.scss'

import {Route} from 'react-router'

import './varetellinger'

import AngularWrapper from '../../AngularWrapper'
import Accounts from './accounts'
import InventoryItems from './inventoryItems'
import SalesEstimates from './salesEstimates'
import SalesProducts from './salesProducts'
import Vendors from './vendors'

export default (
  <Route>
    <Route name='varer/råvarer' path='/varer/råvarer' handler={AngularWrapper}/>
    <Route name='varer/varetellinger' path='/varer/varetellinger' handler={AngularWrapper}/>
    {Accounts}
    {InventoryItems}
    {SalesEstimates}
    {SalesProducts}
    {Vendors}
    <Route path="/varer/**" handler={AngularWrapper}/>
  </Route>
)
