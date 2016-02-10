import React from 'react'
import { Link } from 'react-router'
import { connect } from 'nuclear-js-react-addons'
import moment from '../../../moment'
import getters from '../getters'
import * as actions from '../actions'

import Pagination from '../../../components/Pagination'
import Loader from '../../../components/Loader'

import List from './List'

import MemberService from '../services/MemberService'

import { userDetails } from '../../auth/getters'

@connect(props => ({
    members: getters.members,
    userDetails
}))

export default class Search extends React.Component{
    constructor(props) {
        super(props)
        this.state={name: ''}
        this.handleSearch = this.handleSearch.bind(this)
    }

    componentDidMount(){
        this.setState({name: ''})
    }

    render(){
        return(
            <div>
                {this.renderSearchField()}
                <List/>
            </div>
        )
    }

    renderSearchField(){
        return (
            <form onSubmit={this.handleSearch}>
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" name="name" value={this.state.name}
                           placeholder="Search..." onChange={this.handleSearch} />

                </div>
            </form>


        )
    }

    handleSearch(e){
        e.preventDefault()
        this.state.name = e.target.value
        var search = this.state.name

        MemberService.getMemberList(1, 10, 'name', search).then(results =>{
            actions.getMemberList(1, 10, 'name', search)
            this.setState(
                {
                    isSending: false,
                }
            )
        }, error => {
            this.setState({
                name: ''
            })
        })
    }

}