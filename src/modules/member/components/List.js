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

export default class List extends React.Component {
    componentDidMount() {
        actions.getMemberList(1, 50, 'date_joined')
    }

    handlePageChange(newPage) {
        actions.getMemberList(newPage)
    }


    renderDate(date) {
        return moment(date).format("dddd DD. MMM YYYY HH:mm")
    }

    renderLifetime(lifetime) {

        if (lifetime == true) {
            return 'Yes'
        } else {
            return 'No'
        }
    }

    renderList() {
        return(
            <table className="table table-bordered">
                <thead>
                <tr>
                    <td>Name</td>
                    <td>Date sold</td>
                    <td>Email</td>
                    <td>Lifetime</td>
                </tr>
                </thead>
                <tbody>
                {this.props.members.get('data').get('results').toJS().map((member) => {
                    return (
                        <tr key={member.id}>
                            <td>{member.name}</td>
                            <td>{this.renderDate(member.date_joined)}</td>
                            <td>{member.email}</td>
                            <td>{this.renderLifetime(member.lifetime)}</td>
                        </tr>)
                })}
                </tbody>
            </table>
        )
    }

    renderPageSwitcher(){
        if(this.props.members.get('data').get('pages') == 1){
            return
        } else {
            return (
                <Pagination
                    active={this.props.members.get('data').get('page')}
                    pages={this.props.members.get('data').get('pages')}
                    onChange={this.handlePageChange}
                />
            )
        }
    }

    render() {

        if (!this.props.members.get('data')) {
            return (<div><h1>CRAP!</h1></div>)

        } else {
            return (
                <div>
                    {this.renderList()}
                    {this.renderPageSwitcher()}
                </div>)
        }
    }
}