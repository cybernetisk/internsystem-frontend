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

export default (
  <React.Fragment>
    <Route exact path="/intern" component={Stats}/>
    <Route exact path="/intern/groups" component={Groups}/>
    <Route exact path="/intern/groups/:groupId" component={Group}/>
    <Route exact path="/intern/levels" component={Levels}/>
    <Route exact path="/intern/interns" component={Interns}/>
    <Route exact path="/intern/interns/:userId" component={Intern}/>
    <Route exact path="/intern/roles" component={Roles}/>
    <Route exact path="/intern/roles/:roleId" component={Role}/>
    <Route exact path="/intern/add" component={AddIntern}/>
  </React.Fragment>
)
