import {Route} from 'react-router'
import reactor from '../../../reactor'

import ListStore from './ListStore'
import List from './List'

reactor.registerStores({
  varerVendors: ListStore,
})

export default (
  <Route>
    <Route name='varer/leverandører' path='/varer/leverandører' handler={List}/>
  </Route>
)
