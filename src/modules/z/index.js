import React from 'react'
import { Route, RouteHandler } from 'react-router'

import Index from './components/Index'
import Stats from './components/Stats'

module.exports = (
  <Route>
    <Route name="z" path="/z" handler={Index} />
    <Route name="z/stats" path="/z/stats" handler={Stats} />
  </Route>
)
