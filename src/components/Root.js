import React from 'react'
import { Link, RouteHandler } from 'react-router'
import { provideReactor } from 'nuclear-js-react-addons'

import Nav from './Nav'

export default
@provideReactor
class Root extends React.Component {

  render() {
    return (
      <div>
        <Nav />
        <div className='container'>
          <RouteHandler />
        </div>
      </div>
    )
  }
}
