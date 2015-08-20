import './app.scss'

import {Route} from 'react-router'

import './angularModule'

import Index from './index/Index'

import './common/components/PrisDato'
import './common/components/PrisMargin'
import './common/components/VareMengde'

import './kontoer/KontoerController'
import './kontoer/KontoerItemController'

import './leverandører/LeverandørerController'

import './råvarer/RåvarerController'
import './råvarer/RåvarerEditController'
import './råvarer/RåvarerIndexListView'
import './råvarer/RåvarerItemController'

import './salgskalkyler/SalgskalkylerController'

import './salgsvarer/SalgsvarerController'
import './salgsvarer/SalgsvarerIndexListView'

import './varetellinger'

import AngularWrapper from '../../AngularWrapper'

export default (
  <Route>
    <Route name='varer' path='/varer' handler={Index}/>
    <Route name='varer/råvarer' path='/varer/råvarer' handler={AngularWrapper}/>
    <Route name='varer/salgsvarer' path='/varer/salgsvarer' handler={AngularWrapper}/>
    <Route name='varer/kontoer' path='/varer/kontoer' handler={AngularWrapper}/>
    <Route name='varer/leverandører' path='/varer/leverandører' handler={AngularWrapper}/>
    <Route name='varer/salgskalkyler' path='/varer/salgskalkyler' handler={AngularWrapper}/>
    <Route name='varer/varetellinger' path='/varer/varetellinger' handler={AngularWrapper}/>
    <Route path="/varer/**" handler={AngularWrapper}/>
  </Route>
)
