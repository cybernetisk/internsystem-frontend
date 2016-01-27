import reqwest from 'reqwest'
import {api} from '../../../api'

import deferredGetter from '../../../utils/deferredGetter'
import {csrfToken} from '../../../modules/auth/getters'

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
      url: api('voucher/worklogs'),
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

  registerWork(user, date_worked, work_group, hours, comment) {
    return new Promise((resolve, reject) => {
      deferredGetter(csrfToken).then(csrfToken => {
        reqwest({
          url: api('voucher/worklogs'),
          method: 'post',
          data: {
            user,
            date_worked,
            work_group,
            hours,
            comment
          },
          headers: {
            'X-CSRFToken': csrfToken
          },
          type: 'json'
        }).then(resolve, reject)
      })
    })
  }
}

export default new VoucherService()
