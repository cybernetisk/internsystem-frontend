import React from 'react'
import {Route} from 'react-router'
import reactor from '../../reactor'

import Intern from './components/Intern'
import Group from './components/Group'
import Stats from './components/Stats'


module.exports = (
  <Route>
    <Route name="intern" path="intern" handler={Stats}/>
    <Route name="intern/Intern" path="intern/:internId" handler={Intern}/>
    <Route name="intern" path="intern/group" handler={Group}/>
  </Route>
)
