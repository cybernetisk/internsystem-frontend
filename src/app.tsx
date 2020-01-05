import domready from "domready"
import React from "react"
import ReactDOM from "react-dom"
import { hot } from "react-hot-loader"
import { Route } from "react-router"
import Admin from "./admin"
import "./app.scss"
import Index from "./components/Index"
import Root from "./components/Root"
import { buildTime, gitCommitShort } from "./manifest"
import Auth from "./modules/auth"
import Intern from "./modules/intern"
import Member from "./modules/member"
import Varer from "./modules/varer"
import Voucher from "./modules/voucher"
import Z from "./modules/z"

const commitLink = `https://github.com/cybernetisk/internsystem-frontend/commit/${gitCommitShort}`

console.info(
  "Internsystem frontend\n" +
    `- built ${buildTime}\n` +
    `- from Git commit ${gitCommitShort}: ${commitLink}`,
)

const App = () => (
  <Root>
    <Route exact path="/" component={Index} />
    {Admin}
    {Auth}
    {Varer}
    {Voucher}
    {Z}
    {Member}
    {Intern}
  </Root>
)

const HotApp = hot(module)(App)

domready(() => {
  ReactDOM.render(<HotApp />, document.getElementById("react_container"))
})
