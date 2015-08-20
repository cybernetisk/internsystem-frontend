import './app.scss'
import 'bootstrap-sass'

import {Route} from 'react-router'

import './angularModule'
import './modules/varer'

//import jquery from 'jquery'
//window.jQuery = window.$ = jquery

//import mathjs from 'mathjs'
//window.math = mathjs

import './angular_common/antall.filter.js'
import './angular_common/loader.directive.js'
import './angular_common/pagination.directive.js'
import './angular_common/price.filter.js'

import AngularWrapper from './AngularWrapper'

export default (
  <Route>
    <Route name='varer' path='/varer' handler={AngularWrapper}/>
    <Route name='varer/råvarer' path='/varer/råvarer' handler={AngularWrapper}/>
    <Route name='varer/salgsvarer' path='/varer/salgsvarer' handler={AngularWrapper}/>
    <Route name='varer/kontoer' path='/varer/kontoer' handler={AngularWrapper}/>
    <Route name='varer/leverandører' path='/varer/leverandører' handler={AngularWrapper}/>
    <Route name='varer/salgskalkyler' path='/varer/salgskalkyler' handler={AngularWrapper}/>
    <Route name='varer/varetellinger' path='/varer/varetellinger' handler={AngularWrapper}/>
    <Route path="/varer/**" handler={AngularWrapper}/>
  </Route>
)
