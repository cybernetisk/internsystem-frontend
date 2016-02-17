import React from 'react'
import {Route} from 'react-router'
import reactor from '../../../reactor'

import ListStore from './ListStore'
import List from './List'

reactor.registerStores({
  varerVendors: ListStore,
})

export default (
  <Route>
    <Route name="varer/vendors" path="/varer/vendors" handler={List}/>
  </Route>
)
