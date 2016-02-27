import React from 'react'
import {Route} from 'react-router'
import reactor from '../../reactor'

import Add from './components/Add'
import MemberList from './components/MemberList'
import Stats from './components/Stats'
import Search from './components/Search'
import Member from './components/Member'
import Semester from './components/Semester'

import MemberListStore from './stores/MemberListStore'
import MemberStore from './stores/MemberStore'
import StatsStore from './stores/MemberStatsStore'

reactor.registerStores({
  members: MemberListStore,
  member: MemberStore,
  memberStats: StatsStore
})

module.exports = (
  <Route>
    <Route name="member" path="/member" handler={Stats}/>
    <Route name="member/add" path="/member/add" handler={Add}/>
    <Route name="member/list" path="/member/list" handler={MemberList}/>
    <Route name="member/search" path="/member/search" handler={Search}/>
    <Route name="member/member" path="/member/:memberId" handler={Member}/>
    <Route name="member/semester" path="member/semester/:semId" handler={Semester}/>
  </Route>

)
