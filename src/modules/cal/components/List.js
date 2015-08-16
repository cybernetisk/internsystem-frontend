import moment from '../../../moment'
import React from 'react'
import { Link } from 'react-router'
import { nuclearComponent } from 'nuclear-js-react-addons'

import {api} from '../../../api'
import getters from '../getters'
import actions from '../actions'

import Loader from '../../../components/Loader'

export default
@nuclearComponent({
  list: getters.list
})
class List extends React.Component {
  componentDidMount() {
    actions.fetchList()
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
            <th>Start</th>
            <th>End</th>
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

            return (
              <tr key={event.id}>
                <td><Link to={`/cal/event/${event.id}`}>{event.title}</Link></td>
                <td>{start}</td>
                <td>{end}</td>
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
        <Loader
          isLoading={this.props.list.get('loading')}
          error={this.props.list.get('error')}
          isEmpty={this.props.list.get('items').isEmpty()}>
          Ingen kalenderoppføringer eksisterer.
        </Loader>
        <p>Calendar-file: <a href={calUrl}>{calUrl}</a></p>
        {this.renderList()}
      </div>
    )
  }
}
