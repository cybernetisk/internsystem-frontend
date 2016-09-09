import React from 'react'



export  default class Roles extends React.Component {

  render() {
    if (!this.props.isLoggedIn) {
      return (
        <h1>Not logged in! Please login!</h1>
      )
    }
    return (
      <h1>Not implemented yet</h1>
    )
  }
}
