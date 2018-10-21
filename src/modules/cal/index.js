import React from 'react'
import { Route } from 'react-router'
import { provideReactor } from 'nuclear-js-react-addons-chefsplate'

import reactor from '../../reactor'

import Event from './components/Event'
import List from './components/List'

import EventStore from './stores/EventStore'
import ListStore from './stores/ListStore'
import SemestersStore from './stores/SemestersStore'

reactor.registerStores({
  calList: ListStore,
  calEvent: EventStore,
  calSemesters: SemestersStore,
})

export default (
  <React.Fragment>
    <Route exact path="/cal" component={List} />
    <Route exact path="/cal/event/:eventId" component={Event} />
  </React.Fragment>
)
