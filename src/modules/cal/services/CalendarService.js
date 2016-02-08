import reqwest from '../../../utils/reqwest'
import {api} from '../../../api'

class CalendarService {

  getEventList(year, semester) {
    let semesterOffset = semester == 1 ? 1 : 7
    let toDay = semester == 1 ? 30 : 31
    let from = `${year}-${semesterOffset}-01`
    let to = `${year}-${semesterOffset+5}-${toDay}`

    return reqwest({
      url: api(`cal/events?f=${from}&t=${to}`),
      type: 'json'
    })
  }

  getEvent(eventId) {
    return reqwest({
      url: api('cal/events/' + eventId),
      type: 'json'
    })
  }

  getSemesters() {
    return reqwest({
      url: api('cal/semesters'),
      type: 'json'
    })
  }
}

export default new CalendarService()
