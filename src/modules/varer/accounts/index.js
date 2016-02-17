import React from 'react'
import {Route} from 'react-router'
import reactor from '../../../reactor'

import ListStore from './ListStore'
import List from './List'

reactor.registerStores({
  varerAccounts: ListStore,
})

export default (
  <Route>
    <Route name="varer/accounts" path="/varer/accounts" handler={List}/>
  </Route>
)
