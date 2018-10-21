import React from 'react'
import { Route } from 'react-router'

import Index from './components/Index'
import Stats from './components/Stats'

export default (
  <React.Fragment>
    <Route exact path="/z" component={Index} />
    <Route exact path="/z/stats" component={Stats} />
  </React.Fragment>
)
