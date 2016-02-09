import React from 'react'
import { Link } from 'react-router'

import List from './List'

import MemberService from '../services/MemberService'

export default class Add extends React.Component{
    constructor(props) {
        super(props)

        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handleLifetimeChange = this.handleLifetimeChange.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

        this.initState()
    }
    handleNameChange(e) {
        this.setState({name: e.target.value});
    }
    handleEmailChange(e) {
        this.setState({email: e.target.value});
    }
    handleLifetimeChange(e) {
        this.setState({lifetime: e.target.checked})
    }
    initState() {
        this.state = {name: '', email: '', lifetime: false}
    }
    handleSubmit(e){
        e.preventDefault()
        var name = this.state.name
        var email = this.state.email
        var lifetime = this.state.lifetime
        MemberService.registerMember(name, email, lifetime)
        this.initState()


    }

    renderNewMembers(
    return (
            <div>
                <table className="table table-striped" >
                    <thead>
                        <th>Name</th>
                        <th>Date sold</th>
                        <th>Email</th>
                        <th>Lifetime</th>
                    </thead>
                    <tbody>
                        {this.props.members.get('data').get('results').toJS().map((member) => {
                        return(
                            <tr key={member.id}>
                                <td>{member.name}</td>
                                <td>{this.renderDate(member.date_joined)}</td>
                                <td>{member.email}</td>
                                <td>{member.liftetime}</td>
                            </tr>)
                        })}
                    </tbody>
                </table>
            </div>)
    )

    renderAddForm() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="'text" name="'name" value={this.state.name} placeholder="John Doe"
                           onChange={this.handleNameChange}/>

                    <label for="email">Email:</label>
                    <input type="text" name='email' value={this.state.email} placeholder="user@example.com"
                           onChange={this.handleEmailChange}/>

                    <label for="lifetime">Lifetime</label>
                    <input type="checkbox" name="lifetime" value={this.state.lifetime}
                           onChange={this.handleLifetimeChange}/>
                    <input type="submit" value="Add member"/>
                </div>
            </form>
        )

    }

    renderNewlyMembers() {
        return (
            <List />
        )
    }



    render() {
        return (
            <div><h1>Add member</h1>
                {this.renderAddForm()}
                <h2>Recent members:</h2>
                {this.renderNewlyMembers()}
            </div>
        )

    }

}