import {Route} from 'react-router'
import reactor from '../../../reactor'

import ListStore from './list/ListStore'
import List from './list/List'

reactor.registerStores({
  varerInventoryCounts: ListStore,
})

import './item'

export default (
  <Route>
    <Route name='varer/inventorycounts' path='/varer/inventorycounts' handler={List}/>
  </Route>
)
