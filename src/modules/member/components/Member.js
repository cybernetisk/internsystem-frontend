import React from 'react'
import { Link } from 'react-router'
import { connect } from 'nuclear-js-react-addons'
import moment from '../../../moment'

import {api} from '../../../api'

import getters from '../getters'
import * as actions from '../actions'
import { userDetails, isLoggedIn } from '../../auth/getters'

import PageLoader from '../../../components/PageLoader'
import MemberService from '../services/MemberService'

@connect(props => ({
    member: getters.member,
    userDetails,
    isLoggedIn

}))
export default class Member extends React.Component {

    constructor(props){
        super(props)
        this.handleEdit = this.handleEdit.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this)
        this.saveEdit = this.saveEdit.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handleHonoraryChange = this.handleHonoraryChange.bind(this)
        this.handleLifetimeChange = this.handleLifetimeChange.bind(this)
    }
    componentDidMount(){
        let memberId = this.props.params.memberId
        MemberService.getMember(memberId).then(result =>{
                this.setState({
                    isEditing: false,
                    id: result.id,
                    name: result.name,
                    email: result.email,
                    date_joined: result.date_joined,
                    lifetime: result.lifetime,
                    honorary: result.honorary,
                    semester: result.semester,
                    can_edit: result.can_edit

                })
            }, error => {
                alert(error.responseText)
            }
        )
    }




    render() {
        if(!this.props.isLoggedIn){
            return (
                <h1>Not logged in! Please login!</h1>
            )
        }

        if (this.state.isEditing) {
            return (
                <div>
                    {this.renderEdit()}
                </div>
            )
        } else {
            return (
                <div>{this.renderNormal()}</div>
            )
        }
    }

    handleNameChange(e){
        this.setState({name: e.target.value})
    }
    handleEmailChange(e){
        this.setState({email: e.target.value})
    }
    handleLifetimeChange(e){
        this.setState({lifetime: e.target.checked})
    }
    handleHonoraryChange(e){
        this.setState({honorary: e.target.checked})
    }



    renderEdit() {
        return(
            <div>

                <button type="button" className="btn btn-default" onClick={this.handleEdit}>Abort</button>
                <button type="button" className="btn btn-default" onClick={this.saveEdit}>Save</button>
                <div className="panel-body">
                    <form>
                        <div className="row">
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="'text" name="'name" value={this.state.name}
                                       onChange={this.handleNameChange} className="form-control"/>
                                <label htmlFor="email">Email:</label>
                                <input type="text" name='email' value={this.state.email}
                                       onChange={this.handleEmailChange} className="form-control"/>
                                <label htmlFor="lifetime">Lifetime</label>
                                <input type="checkbox" name="lifetime" checked={this.state.lifetime}
                                       onChange={this.handleLifetimeChange}/>
                                <label htmlFor="honorary">Honorary</label>
                                <input type="checkbox" name="honorary" checked={this.state.honorary}
                                       onChange={this.handleLifetimeChange}/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    saveEdit(e){
        e.preventDefault()
        MemberService.updateMember(this.state.id, this.state.name, this.state.email,
            this.state.lifetime, this.state.honorary).then(result => {
            this.setState({
                isEditing: false,
                id: result.id,
                name: result.name,
                email: result.email,
                date_joined: result.date_joined,
                lifetime: result.lifetime,
                honorary: result.honorary,
                semester: result.semester,
                can_edit: result.can_edit
            })
        }, error => {
            alert(error.responseText)
        })
    }




    renderNormal() {


        return (<div>
                <h1>{this.state.name}</h1>
                <dl>
                    <dt>Name:</dt>
                    <dd>{this.state.name}</dd>
                    <dt>Mail:</dt>
                    <dd>{this.renderMail(this.state.email)}</dd>
                    <dt>Joined:</dt>
                    <dd>{moment(this.state.date_joined).format('DD.MMM YYYY')}</dd>
                    <dt>Honorary member:</dt>
                    <dd>{this.renderBoolean(this.state.honorary)}</dd>
                    <dt>Lifetime member:</dt>
                    <dd>{this.renderBoolean(this.state.lifetime)}</dd>
                    <dt>Semester:</dt>
                    <dd>{this.renderSemester(this.state.semester)}</dd>
                </dl>
                <button type="button" className="btn btn-default" onClick={this.handleEdit}>Edit</button>
            </div>
        )

    }
    handleEdit(){
        if(this.state.isEditing) {
            this.setState({isEditing: false})
        }
        this.setState({isEditing: true})
    }


    renderMail(mail){
        if(mail){
            return mail
        } else {
            return 'No mail registered.'
        }
    }


    renderBoolean(bool){
        if(bool){
            return('True')
        } else {
            return('False')
        }
    }
    renderSemester(semester){
        return(
            <div>{semester.year} {semester.semester}</div>
        )

    }
}