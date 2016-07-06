import React from 'react'

export  default class Role extends React.Component {

  render() {
    if (!this.props.isLoggedIn) {
      return (
        <h1>Not logged in! Please login!</h1>
      )
    }
    return (
      <h1>Not impl2emented yet</h1>
    )
  }
}
