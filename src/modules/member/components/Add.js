import React from 'react'
import { Link } from 'react-router'

import MemberService from '../services/MemberService'

export default class Add extends React.Component{
    constructor(props) {
        super(props)

        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handleLifetimeChange = this.handleLifetimeChange.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

        this.state= {name: '', email: '', lifetime: false}
    }
    handleNameChange(e) {
        this.setState({name: e.target.value});
    }
    handleEmailChange(e) {
        this.setState({email: e.target.value});
    }
    handleLifetimeChange(e) {
        this.setState({lifetime: e.target.value})
    }
    handleSubmit(e){
        e.preventDefault()
        var name = this.state.name
        var email = this.state.email
        var lifetime = this.state.lifetime
        MemberService.registerMember(name, email, lifetime)
    }


    render() {
       return (
           <form onSubmit={this.handleSubmit}>
               <div class="form-group">
                    <label for="name">Name</label>
                    <input type="'text" name="'name" value={this.state.name} placeholder="John Doe"
                           onChange={this.handleNameChange}/>
               </div>
               <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="text" name='email' value={this.state.email} placeholder="user@example.com"
                           onChange={this.handleEmailChange}/>
               </div>
               <div class="form-group">
                    <label for="lifetime">Lifetime</label>
                    <input type="checkbox" name="lifetime" value={this.state.lifetime}
                           onChange={this.handleLifetimeChange}/>
               </div>
               <input type="submit" value="Add member"/>
           </form>
       )

    }

}