import './app.scss'

import {Route} from 'react-router'

import './angularModule'

import './common/components/PrisDato'
import './common/components/PrisMargin'
import './common/components/VareMengde'

import './råvarer/RåvarerController'
import './råvarer/RåvarerEditController'
import './råvarer/RåvarerIndexListView'
import './råvarer/RåvarerItemController'

import './salgsvarer/SalgsvarerController'
import './salgsvarer/SalgsvarerIndexListView'

import './varetellinger'

import AngularWrapper from '../../AngularWrapper'
import Accounts from './accounts'
import Index from './index/index'
import SalesEstimates from './salesEstimates'
import Vendors from './vendors'

export default (
  <Route>
    <Route name='varer/råvarer' path='/varer/råvarer' handler={AngularWrapper}/>
    <Route name='varer/salgsvarer' path='/varer/salgsvarer' handler={AngularWrapper}/>
    <Route name='varer/varetellinger' path='/varer/varetellinger' handler={AngularWrapper}/>
    {Accounts}
    {Index}
    {SalesEstimates}
    {Vendors}
    <Route path="/varer/**" handler={AngularWrapper}/>
  </Route>
)
