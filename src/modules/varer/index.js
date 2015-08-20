import './app.scss'

import {Route} from 'react-router'

import './angularModule'

import './common/components/PrisDato'
import './common/components/PrisMargin'
import './common/components/VareMengde'

import './kontoer/KontoerController'
import './kontoer/KontoerItemController'

import './råvarer/RåvarerController'
import './råvarer/RåvarerEditController'
import './råvarer/RåvarerIndexListView'
import './råvarer/RåvarerItemController'

import './salgskalkyler/SalgskalkylerController'

import './salgsvarer/SalgsvarerController'
import './salgsvarer/SalgsvarerIndexListView'

import './varetellinger'

import AngularWrapper from '../../AngularWrapper'
import Vendors from './vendors'

import Index from './index/Index'

export default (
  <Route>
    <Route name='varer' path='/varer' handler={Index}/>
    <Route name='varer/råvarer' path='/varer/råvarer' handler={AngularWrapper}/>
    <Route name='varer/salgsvarer' path='/varer/salgsvarer' handler={AngularWrapper}/>
    <Route name='varer/kontoer' path='/varer/kontoer' handler={AngularWrapper}/>
    <Route name='varer/salgskalkyler' path='/varer/salgskalkyler' handler={AngularWrapper}/>
    <Route name='varer/varetellinger' path='/varer/varetellinger' handler={AngularWrapper}/>
    {Vendors}
    <Route path="/varer/**" handler={AngularWrapper}/>
  </Route>
)
