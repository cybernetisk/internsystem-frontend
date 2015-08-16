import reqwest from 'reqwest'
import {api} from '../../../api'

class CalendarService {

  getEventList() {
    return reqwest({
      url: api('cal/events'),
      type: 'json'
    })
  }

  getEvent(eventId) {
    return reqwest({
      url: api('cal/events/' + eventId),
      type: 'json'
    })
  }
}

export default new CalendarService()
