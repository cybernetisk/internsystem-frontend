import { api } from "../../../api"
import reqwest from "../../../utils/reqwest"

class VoucherService {
  getWalletStats() {
    return reqwest({
      url: api("voucher/wallets/stats"),
      type: "json",
    })
  }

  getWallets(data = {}) {
    return reqwest({
      url: api("voucher/wallets"),
      data,
      type: "json",
    })
  }

  getWorkLogs(page = 1, limit = 50) {
    return reqwest({
      url: api("voucher/worklogs"),
      data: {
        page,
        limit,
      },
      type: "json",
    })
  }

  getUseLogs(page = 1, limit = 50) {
    return reqwest({
      url: api("voucher/uselogs"),
      data: {
        page,
        limit,
      },
      type: "json",
    })
  }

  getUsers(search) {
    return reqwest({
      url: api("core/users"),
      data: {
        search,
        limit: 20,
      },
      type: "json",
    })
  }

  getWorkGroups() {
    return reqwest({
      url: api("voucher/workgroups"),
      type: "json",
    })
  }

  registerWork(username, dateWorked, workGroup, hours, comment) {
    return reqwest({
      url: api("voucher/worklogs"),
      method: "post",
      data: {
        user: username,
        // eslint-disable-next-line @typescript-eslint/camelcase
        date_worked: dateWorked,
        // eslint-disable-next-line @typescript-eslint/camelcase
        work_group: workGroup,
        hours,
        comment,
      },
      type: "json",
    })
  }

  useVouchers(username, vouchers, comment) {
    return reqwest({
      url: api(`voucher/users/${username}/use_vouchers`),
      method: "post",
      data: {
        vouchers,
        comment,
      },
      type: "json",
    })
  }

  updateWorkLog(id, data) {
    return reqwest({
      url: api(`voucher/worklogs/${id}`),
      method: "patch",
      data,
      type: "json",
    })
  }

  deleteWorkLog(id) {
    return reqwest({
      url: api(`voucher/worklogs/${id}`),
      method: "delete",
      type: "json",
    })
  }
}

export default new VoucherService()
