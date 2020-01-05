import { ConnectedRouter } from "connected-react-router"
import { Provider as NuclearProvider } from "nuclear-js-react-addons-chefsplate"
import React from "react"
import { Provider } from "react-redux"
import reactor from "../reactor"
import { history, store } from "../store"
import { Nav } from "./Nav"

export default class Root extends React.Component {
  render() {
    return (
      <NuclearProvider reactor={reactor}>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <div>
              <Nav />
              <div className="container">{this.props.children}</div>
            </div>
          </ConnectedRouter>
        </Provider>
      </NuclearProvider>
    )
  }
}
