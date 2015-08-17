import moment from '../../../moment'
import React from 'react'
import { Link } from 'react-router'
import { nuclearComponent } from 'nuclear-js-react-addons'

import {api} from '../../../api'
import getters from '../getters'
import actions from '../actions'

import Loader from '../../../components/Loader'
import Tag from './Tag'

export default
@nuclearComponent({
  list: getters.list,
  semesters: getters.semesters,
})
class List extends React.Component {
  componentDidMount() {
    actions.fetchList(this.props.list.get('year'), this.props.list.get('semester'))
    actions.fetchSemesters()
  }

  handleSemester(semester, event) {
    event.preventDefault()
    actions.fetchList(semester.year, parseInt(semester.semester.substring(0, 1)))
  }

  renderSemesters() {
    if (this.props.semesters.get('items').isEmpty()) {
      return
    }

    return (
      <ul>
        {this.props.semesters.get('items').toList().toJS().map(semester => {
          return (
            <li key={semester.year+semester.semester}>
              <a href onClick={event => this.handleSemester(semester, event)}>{semester.year} {semester.semester}</a>
            </li>
          )
        })}
      </ul>
    )
  }

  renderList() {
    if (this.props.list.get('items').isEmpty()) {
      return
    }

    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Duration</th>
            <th>.ics</th>
          </tr>
        </thead>
        <tbody>
          {this.props.list.get('items').toList().toJS().map((event) => {
            let start, end
            if (event.is_allday) {
              start = moment.utc(event.start).format("ddd D. MMM YYYY")
              end = moment.utc(event.end).format("ddd D. MMM YYYY")
            } else {
              start = moment(event.start).format("ddd D. MMM YYYY HH:mm")
              end = moment(event.end).format("ddd D. MMM YYYY HH:mm")
            }

            let duration = start === end ? start : `${start} - ${end}`

            return (
              <tr key={event.id}>
                <td>
                  <Link to={`/cal/event/${event.id}`}>{event.title}</Link>
                  {event.is_external ? <Tag text='Utlån' /> : ''}
                  {!event.in_escape ? <Tag text='Ikke Escape' type='not-escape' /> : ''}
                  {!event.is_public ? <Tag text='Internt' type='not-public' /> : ''}
                </td>
                <td>{duration}</td>
                <td><a target="_self" href={api(`cal/events/${event.id}.ics`)}>.ics</a></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }

  render() {
    let calUrl = api('cal/events.ics')

    return (
      <div>
        <h1>Calendar</h1>
        <p>Calendar-file: <a href={calUrl}>{calUrl}</a></p>
        <Loader
          isLoading={this.props.semesters.get('loading')}
          error={this.props.semesters.get('error')}
          isEmpty={this.props.semesters.get('items').isEmpty()}>
          Ingen semestre inneholder kalenderoppføringer.
        </Loader>
        {this.renderSemesters()}
        <Loader
          isLoading={this.props.list.get('loading')}
          error={this.props.list.get('error')}
          isEmpty={this.props.list.get('items').isEmpty()}>
          Ingen kalenderoppføringer eksisterer for valgt semester.
        </Loader>
        {this.renderList()}
      </div>
    )
  }
}
