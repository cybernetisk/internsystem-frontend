import reqwest from '../../../utils/reqwest'
import {api} from '../../../api'

class VoucherService {

  getWalletStats() {
    return reqwest({
      url: api('voucher/wallets/stats'),
      type: 'json'
    })
  }

  getWallets(data = {}) {
    return reqwest({
      url: api('voucher/wallets'),
      data,
      type: 'json'
    })
  }

  getWorkLogs(page = 1, limit = 50) {
    return reqwest({
      url: api('voucher/registerlogs'),
      data: {
        page,
        limit
      },
      type: 'json'
    })
  }

  getUseLogs(page = 1, limit = 50) {
    return reqwest({
      url: api('voucher/uselogs'),
      data: {
        page,
        limit
      },
      type: 'json'
    })
  }

  getUsers(search) {
    return reqwest({
      url: api('core/users'),
      data: {
        search,
        limit: 20
      },
      type: 'json'
    })
  }

  getWorkGroups() {
    return reqwest({
      url: api('voucher/workgroups'),
      type: 'json'
    })
  }

  registerWork(username, date_worked, work_group, hours, comment) {
    return reqwest({
      url: api('voucher/registerlogs'),
      method: 'post',
      data: {
        user: username,
        date_worked,
        work_group,
        hours,
        comment
      },
      type: 'json'
    })
  }

  useVouchers(username, vouchers, comment) {
    return reqwest({
      url: api(`voucher/users/${username}/use_vouchers`),
      method: 'post',
      data: {
        vouchers,
        comment
      },
      type: 'json'
    })
  }

  updateWorkLog(id, data) {
    return reqwest({
      url: api(`voucher/registerlogs/${id}`),
      method: 'patch',
      data,
      type: 'json'
    })
  }

  deleteWorkLog(id) {
    return reqwest({
      url: api(`voucher/registerlogs/${id}`),
      method: 'delete',
      type: 'json'
    })
  }
}

export default new VoucherService()
