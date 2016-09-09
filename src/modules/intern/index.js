import React from 'react'
import {Route} from 'react-router'
import reactor from '../../reactor'

import AddIntern from './components/AddIntern'
import Intern from './components/Intern'
import InternList from './components/InternList'
import Interns from './components/Interns'
import Group from './components/Group'
import Groups from './components/Groups'
import Stats from './components/Stats'
import Levels from './components/Levels'
import Role from './components/Role'
import Roles from './components/Roles'

import AccessLevelsStore from './stores/AccessLevelStore'
import InternStore from './stores/InternStore'
import InternListStore from './stores/InternListStore'
import RolesStore from './stores/RolesStore'
import GroupListStore from './stores/GroupListStore'
import GroupStore from './stores/GroupStore'
import InternRolesStore from './stores/InternRolesStore'
import UIOCardsStore from './stores/UIOCardStore'


reactor.registerStores({
  accesslevels: AccessLevelsStore,
  interns: InternStore,
  groups: GroupListStore,
  internList: InternListStore,
  group: GroupStore,
  roles: RolesStore,
  internroles: InternRolesStore,
  uiocards: UIOCardsStore
})
module.exports = (
  <Route>
    <Route name="intern" path="/intern" handler={Stats}/>
    <Route name="intern/groups" path="/intern/groups" handler={Groups}/>
    <Route name="intern/group" path="/intern/groups/:groupId" handler={Group}/>
    <Route name="intern/levels" path="/intern/levels" handler={Levels}/>
    <Route name="intern/interns" path="intern/interns" handler={Interns}/>
    <Route name="intern/intern" path="/intern/interns/:userId" handler={Intern}/>
    <Route name="intern/roles" path="/intern/roles" handler={Roles}/>
    <Route name="intern/role" path="/intern/roles/:roleId" handler={Role}/>
    <Route name="intern/add" path="/intern/add" handler={AddIntern}/>
  </Route>)
