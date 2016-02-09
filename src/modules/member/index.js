import React from 'react'
import {Route} from 'react-router'
import reactor from '../../reactor'
import Add from './components/Add'
import List from './components/List'
import Stats from './components/Stats'
import MemberStore from './stores/MemberStore'

reactor.registerStores({
    members: MemberStore
})

module.exports = (
    <Route>
        <Route name="member" path="/member" handler={Stats} />
        <Route name="member/add" path="/member/add" handler={Add} />
        <Route name="member/list" path="/member/List" handler={List} />
    </Route>

)