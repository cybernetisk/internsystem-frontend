import './app.scss'

import domready from 'domready'
import React from 'react'
import ReactDOM from 'react-dom'
import { Route } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { hot } from 'react-hot-loader'

import Root from './components/Root'
import Index from './components/Index'

import Admin from './admin'
import Auth from './modules/auth'
import Cal from './modules/cal'
import Varer from './modules/varer'
import Voucher from './modules/voucher'
import Z from './modules/z'
import Member from './modules/member'
import Intern from './modules/intern'

import { buildTime, gitCommitShort } from './manifest'

const commitLink = `https://github.com/cybernetisk/internsystem-frontend/commit/${gitCommitShort}`

console.info(
  'Internsystem frontend\n' +
  `- built ${buildTime}\n` +
  `- from Git commit ${gitCommitShort}: ${commitLink}`
)

const App = () => (
  <BrowserRouter>
    <Root>
      <Route exact path="/" component={Index} />
      {Admin}
      {Auth}
      {Cal}
      {Varer}
      {Voucher}
      {Z}
      {Member}
      {Intern}
    </Root>
  </BrowserRouter>
)

const HotApp = hot(module)(App)

domready(() => {
  ReactDOM.render(<HotApp/>, document.getElementById('react_container'))
})
