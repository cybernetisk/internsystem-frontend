import React from 'react'
import { Link, RouteHandler } from 'react-router'
import { Provider } from 'nuclear-js-react-addons'
import reactor from '../reactor'

import Nav from './Nav'

export default class Root extends React.Component {

  render() {
    return (
      <Provider reactor={reactor}>
        <div>
          <Nav />
          <div className="container">
            <RouteHandler />
          </div>
        </div>
      </Provider>
    )
  }
}
