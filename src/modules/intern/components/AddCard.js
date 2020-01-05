import React from "react"

export default class AddCard extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmut = this.handleSubmut.bind(this)
    this.state = {
      isSending: false,
    }
  }

  handleSubmut(e) {
    e.preventDefault()
    if (this.state.isSending) {
      return
    }
  }

  render() {
    return null
  }
}
