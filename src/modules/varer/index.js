import './app.scss'

import {Route} from 'react-router'

import './råvarer/RåvarerController'
import './råvarer/RåvarerIndexListView'

import './varetellinger'

import AngularWrapper from '../../AngularWrapper'
import Accounts from './accounts'
import SalesEstimates from './salesEstimates'
import SalesProducts from './salgsvarer'
import Vendors from './vendors'

export default (
  <Route>
    <Route name='varer/råvarer' path='/varer/råvarer' handler={AngularWrapper}/>
    <Route name='varer/varetellinger' path='/varer/varetellinger' handler={AngularWrapper}/>
    {Accounts}
    {SalesEstimates}
    {SalesProducts}
    {Vendors}
    <Route path="/varer/**" handler={AngularWrapper}/>
  </Route>
)
