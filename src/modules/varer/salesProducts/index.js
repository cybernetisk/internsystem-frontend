import {Route} from 'react-router'
import reactor from '../../../reactor'

import ListStore from './ListStore'
import List from './List'

reactor.registerStores({
  varerSalesProducts: ListStore,
})

export default (
  <Route>
    <Route name='varer/products' path='/varer/products' handler={List}/>
  </Route>
)
