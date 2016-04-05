import reactor from './../../reactor'
import {dispatchAsync} from '../../utils/FluxUtils'

import VoucherService from './services/VoucherService'

import actionTypes from './actionTypes'

export function fetchStats() {
  dispatchAsync(VoucherService.getWalletStats(), {
    request: actionTypes.RECEIVE_STATS_START,
    success: actionTypes.RECEIVE_STATS_SUCCESS,
    failure: actionTypes.RECEIVE_STATS_FAILURE
  })
}

export function fetchUseLogs(page = 1, limit = undefined) {
  dispatchAsync(VoucherService.getUseLogs(page, limit), {
    request: actionTypes.RECEIVE_USELOGS_START,
    success: actionTypes.RECEIVE_USELOGS_SUCCESS,
    failure: actionTypes.RECEIVE_USELOGS_FAILURE
  })
}

export function fetchWallets(data = {}) {
  dispatchAsync(VoucherService.getWallets(data), {
    request: actionTypes.RECEIVE_WALLETS_START,
    success: actionTypes.RECEIVE_WALLETS_SUCCESS,
    failure: actionTypes.RECEIVE_WALLETS_FAILURE
  })
}

export function fetchWorkLogs(page = 1) {
  dispatchAsync(VoucherService.getWorkLogs(page), {
    request: actionTypes.RECEIVE_WORKLOGS_START,
    success: actionTypes.RECEIVE_WORKLOGS_SUCCESS,
    failure: actionTypes.RECEIVE_WORKLOGS_FAILURE
  })
}

export function setActiveSemester(semester) {
  reactor.dispatch(actionTypes.SET_ACTIVE_SEMESTER, {semester})
}

export function workLogUpdated(worklog) {
  reactor.dispatch(actionTypes.WORKLOG_UPDATED, {worklog})
}

export function workLogDeleted(id) {
  reactor.dispatch(actionTypes.WORKLOG_DELETED, {id})
}
