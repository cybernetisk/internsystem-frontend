import React from 'react'

import { connect } from 'nuclear-js-react-addons'

import getters from '../getters'
import {userDetails, isLoggedIn} from '../../auth/getters'

import InternService from '../services/InternService'

@connect(props => ({
  interns: getters.interns,
  userDetails,
  isLoggedIn
}))
export  default class Intern extends React.Component {
  constructor(props){
    super(props)
    this.handleEdit = this.handleEdit.bind(this)

  }
  componentDidMount(){
    let internId = this.props.params.internId
    InternService.getIntern(internId).then(result => {
      actions.getIntern(internId)
      this.setState({

      })
    })
  }
  handleEdit(e) {
    if(this.state.isEditing) {
      this.setState({isEditing: True})
    } else {
      this.setState({isEditing: False})
    }
  }

  render() {
    return (
      <h1>Not implement4ed yet</h1>
    )
  }
}
