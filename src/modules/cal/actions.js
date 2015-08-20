import reactor from './../../reactor'
import {dispatchAsync} from '../../utils/FluxUtils'

import CalendarService from './services/CalendarService'

import actionTypes from './actionTypes'

export function fetchList(year, semester) {
  dispatchAsync(CalendarService.getEventList(year, semester), {
    request: actionTypes.RECEIVE_LIST_START,
    success: actionTypes.RECEIVE_LIST_SUCCESS,
    failure: actionTypes.RECEIVE_LIST_FAILURE
  }, {year, semester})
}

export function fetchEvent(eventId) {
  dispatchAsync(CalendarService.getEvent(eventId), {
    request: actionTypes.RECEIVE_EVENT_START,
    success: actionTypes.RECEIVE_EVENT_SUCCESS,
    failure: actionTypes.RECEIVE_EVENT_FAILURE
  }, {eventId})
}

export function fetchSemesters() {
  dispatchAsync(CalendarService.getSemesters(), {
    request: actionTypes.RECEIVE_SEMESTERS_START,
    success: actionTypes.RECEIVE_SEMESTERS_SUCCESS,
    failure: actionTypes.RECEIVE_SEMESTERS_FAILURE
  })
}
