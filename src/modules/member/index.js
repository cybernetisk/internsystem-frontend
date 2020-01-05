import React from "react"
import { Route, Switch } from "react-router"
import reactor from "../../reactor"
import Add from "./components/Add"
import Lifetime from "./components/Lifetime"
import Member from "./components/Member"
import MemberList from "./components/MemberList"
import Search from "./components/Search"
import Semester from "./components/Semester"
import Stats from "./components/Stats"
import MemberListStore from "./stores/MemberListStore"
import StatsStore from "./stores/MemberStatsStore"
import MemberStore from "./stores/MemberStore"

reactor.registerStores({
  members: MemberListStore,
  member: MemberStore,
  memberStats: StatsStore,
})

export default (
  <Switch>
    <Route exact path="/member" component={Stats} />
    <Route exact path="/member/add" component={Add} />
    <Route exact path="/member/list" component={MemberList} />
    <Route exact path="/member/search" component={Search} />
    <Route exact path="/member/lifetime" component={Lifetime} />
    <Route exact path="/member/:memberId" component={Member} />
    <Route exact path="/member/semester/:semId" component={Semester} />
  </Switch>
)
