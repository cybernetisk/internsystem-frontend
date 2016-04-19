import React from 'react'
import {Route} from 'react-router'
import reactor from '../../reactor'

import Intern from './components/Intern'
import Group from './components/Group'
import Stats from './components/Stats'
import Levels from './components/Levels'

import AccessLevelsStore from './stores/AccessLevelStore'
import InternStore from './stores/InternStore'

reactor.registerStores({
  accesslevels: AccessLevelsStore,
  interns: InternStore
})
module.exports = (
  <Route>
    <Route name="intern" path="/intern" handler={Stats}/>
    <Route name="intern/group" path="/intern/group" handler={Group}/>
    <Route name="intern/levels" path="/intern/levels" handler={Levels}/>
    <Route name="intern/intern" path="/intern/interns/:internId" handler={Intern}/>
  </Route>
)
