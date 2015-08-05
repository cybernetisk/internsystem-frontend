import React from 'react'
import { Route, RouteHandler } from 'react-router'
import { provideReactor } from 'nuclear-js-react-addons'

import reactor from '../../reactor'

import Event from './components/Event'
import List from './components/List'

import EventStore from './stores/EventStore'
import ListStore from './stores/ListStore'

reactor.registerStores({
  list: ListStore,
  event: EventStore
})

module.exports = (
  <Route>
    <Route name="cal/list" path="/cal" handler={List} />
    <Route name="cal/event" path="/cal/event/:eventId" handler={Event} />
  </Route>
)
