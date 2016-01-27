import reqwest from 'reqwest'
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
}

export default new VoucherService()
