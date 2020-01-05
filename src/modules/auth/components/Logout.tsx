import React from "react"
import { saml } from "../../../api"

export default class Logout extends React.Component {
  componentDidMount() {
    console.log("go to logout url")
    window.location.href = saml("?slo")
  }

  render() {
    return <div>Logging out ...</div>
  }
}
