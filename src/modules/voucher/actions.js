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

export function fetchUseLogs(page = 1) {
  dispatchAsync(VoucherService.getUseLogs(page), {
    request: actionTypes.RECEIVE_USELOGS_START,
    success: actionTypes.RECEIVE_USELOGS_SUCCESS,
    failure: actionTypes.RECEIVE_USELOGS_FAILURE
  })
}

export function fetchWorkLogs(page = 1) {
  dispatchAsync(VoucherService.getWorkLogs(page), {
    request: actionTypes.RECEIVE_WORKLOGS_START,
    success: actionTypes.RECEIVE_WORKLOGS_SUCCESS,
    failure: actionTypes.RECEIVE_WORKLOGS_FAILURE
  })
}
