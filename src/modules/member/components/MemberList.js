import React from 'react'
import { Link } from 'react-router'
import { connect } from 'nuclear-js-react-addons'
import moment from '../../../moment'
import getters from '../getters'
import * as actions from '../actions'

import Pagination from '../../../components/Pagination'
import Loader from '../../../components/Loader'

import List from './List'

import { userDetails } from '../../auth/getters'

@connect(props => ({
    members: getters.members,
    userDetails
}))

export default class MemberList extends React.Component{
    constructor(props){
        super(props)
    }
    render() {

        if(!this.props.members.get('data')) {
            return (<div>Failed to get data.</div>)
        }
        return (<div>
            <h1>Memberlist</h1>
            <List/>
        </div>)

    }

}