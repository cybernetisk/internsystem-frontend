import React from 'react'
import { Link } from 'react-router'
import { connect } from 'nuclear-js-react-addons'
import moment from '../../../moment'
import getters from '../getters'
import * as actions from '../actions'

import Pagination from '../../../components/Pagination'
import Loader from '../../../components/Loader'

import { userDetails } from '../../auth/getters'

@connect(props => ({
    members: getters.members,
    userDetails
}))

export default class List extends React.Component{
    componentDidMount(){
        actions.getMemberList(1)
    }
    handlePageChange(newPage) {
        actions.getMemberList(newPage)
    }


    render() {
        if(!this.props.members.get('data')) {
            return (<div><h1>CRAP!</h1></div>)
        }
        return (<div>
            <table className="table table-striped">
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
                            <td>{member.date_joined}</td>
                            <td>{member.email}</td>
                            <td>{member.liftetime}</td>
                        </tr>)
                })}
                </tbody>
            </table>
            <Pagination
                active={this.props.members.get('data').get('page')}
                pages={this.props.members.get('data').get('pages')}
                onChange={this.handlePageChange}
              />

        </div>)

    }

}