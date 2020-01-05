import { Provider } from "nuclear-js-react-addons-chefsplate"
import React from "react"
import reactor from "../reactor"
import Nav from "./Nav"

export default class Root extends React.Component {
  render() {
    return (
      <Provider reactor={reactor}>
        <div>
          <Nav />
          <div className="container">{this.props.children}</div>
        </div>
      </Provider>
    )
  }
}
