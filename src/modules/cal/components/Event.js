import moment from '../../../moment'
import React from 'react'
import { Link } from 'react-router'
import { connect } from 'nuclear-js-react-addons'

import {api} from '../../../api'

import * as actions from '../actions'
import getters from '../getters'

import PageLoader from '../../../components/PageLoader'

@connect(props => ({
  event: getters.event
}))
export default class Event extends React.Component {
  componentDidMount() {
    actions.fetchEvent(this.props.params.eventId)
  }

  renderIncomplete() {
    return (
      <PageLoader
        error={this.props.event.get('error')}
        isLoading={this.props.event.get('isLoading')}
        title="Arrangement"
      />
    )
  }

  render() {
    let event = this.props.event.get('data')
    if (event === null) {
      return this.renderIncomplete()
    }

    event = event.toJS()

    let start, end
    if (event.is_allday) {
      start = moment.utc(event.start).format('dddd DD. MMM YYYY')
      end = moment.utc(event.end).format('dddd DD. MMM YYYY')
    } else {
      start = moment(event.start).format('dddd DD. MMM YYYY HH:mm')
      end = moment(event.end).format('dddd DD. MMM YYYY HH:mm')
    }

    return (
      <div>
        <h1>Arrangement: {event.title}</h1>

        <p><Link to="cal/list">Tilbake</Link></p>

        <p>{start === end ? start : `${start} til ${end}`}</p>

        {event.description !== '' ? (
          <p>Beskrivelse: {event.description}</p>
        ) : ''}

        <dl className="dl-horizontal">
          <dt>In Escape?</dt>
          <dd>{event.in_escape ? 'Yes' : 'No'}</dd>
          <dt>Cancelled?</dt>
          <dd>{event.is_cancelled ? 'Yes' : 'No'}</dd>
          <dt>External event?</dt>
          <dd>{event.is_external ? 'Yes' : 'No'}</dd>
          <dt>Public?</dt>
          <dd>{event.is_published ? 'Yes' : 'No'}</dd>
          <dt>Link</dt>
          <dd>{event.link !== '' ? event.link : 'ingen'}</dd>
          <dt>Organizer</dt>
          <dd>{event.organizer ? event.organizer.realname : 'ingen'}</dd>
        </dl>

        <p><a target="_self" href={api(`cal/events/${event.id}.ics`)}>.ics</a></p>
      </div>
    )
  }
}
