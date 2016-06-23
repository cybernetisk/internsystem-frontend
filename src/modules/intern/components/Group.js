import React from 'react'

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
  renderEdit() {
    //TODO: how should this look
    return(
      <h1>Editing is not implemented yet!</h1>
    )
  }
  renderNormal(){
    //TODO: How should this look.
    return (
      <h1>Not implemented yet</h1>
    )
  }
  render() {
    //TODO: Find out how to render this
    if(this.state.isEditing){
      return this.renderEdit()
    } else {
      return this.renderNormal()
    }
  }
}
