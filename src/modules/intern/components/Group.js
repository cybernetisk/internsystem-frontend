import React from 'react'

import InternService from '../services/InternService'

export  default class Group extends React.Component {

  constructor(props) {
    super(props)
    this.handleEdit = this.handleEdit.bind(this)
    this.abortEdit = this.abortEdit.bind(this)
    this.saveEdit = this.saveEdit.bind(this)
    this.addMember = this.addMember.bind(this)

    this.state = {isEditing: false, isDeleted: false}
  }

  handleEdit(e) {
    if (this.state.isEditing) {
      this.setState({isEditing: false})
    } else {
      this.setState({isEditing: true})
    }
  }
  abortEdit(e) {
    e.preventDefault()
    this.setState({
      isEditing: false
    })
  }

  saveEdit(e) {
    //TODO: write code to update group
  }

  addMember(e){
    //TODO: Write some request to do this
  }
  render() {
    return (
      <h1>Not implemented yet</h1>
    )
  }
}
