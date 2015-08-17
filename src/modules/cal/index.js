import React from 'react'
import { Route, RouteHandler } from 'react-router'
import { provideReactor } from 'nuclear-js-react-addons'

import reactor from '../../reactor'

import Event from './components/Event'
import List from './components/List'

import EventStore from './stores/EventStore'
import ListStore from './stores/ListStore'
import SemestersStore from './stores/SemestersStore'

reactor.registerStores({
  list: ListStore,
  event: EventStore,
  semesters: SemestersStore,
})

module.exports = (
  <Route>
    <Route name="cal/list" path="/cal" handler={List} />
    <Route name="cal/event" path="/cal/event/:eventId" handler={Event} />
  </Route>
)
