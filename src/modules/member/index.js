import React from 'react'
import {Route} from 'react-router'
import reactor from '../../reactor'

import Add from './components/Add'
import MemberList from './components/MemberList'
import Stats from './components/Stats'
import Search from './components/Search'
import Member from './components/Member'
import Semester from './components/Semester'
import Lifetime from './components/Lifetime'

import MemberListStore from './stores/MemberListStore'
import MemberStore from './stores/MemberStore'
import StatsStore from './stores/MemberStatsStore'

reactor.registerStores({
  members: MemberListStore,
  member: MemberStore,
  memberStats: StatsStore
})

export default (
  <React.Fragment>
    <Route exact path="/member" component={Stats}/>
    <Route exact path="/member/add" component={Add}/>
    <Route exact path="/member/list" component={MemberList}/>
    <Route exact path="/member/search" component={Search}/>
    <Route exact path="/member/lifetime" component={Lifetime}/>
    <Route exact path="/member/:memberId" component={Member}/>
    <Route exact path="/member/semester/:semId" component={Semester}/>
  </React.Fragment>
)
