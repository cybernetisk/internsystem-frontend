import { api } from "api"
import { useEffect, useRef } from "react"
import { Subject } from "rxjs"
import { UserSimple } from "types"
import { apiWithAuth, buildUrl, Paginated, useApiFetcher } from "utils/api"
import { useActionCallingReducer, useCrudEventsPaginated } from "utils/state"
import {
  UseLog,
  UseLogCreate,
  Wallet,
  WalletStats,
  WorkLog,
  WorkLogCreate,
  WorkLogUpdate,
} from "./types"

class VoucherService {
  private workLogAdded = new Subject<WorkLog>()
  private workLogModified = new Subject<WorkLog>()
  private workLogDeleted = new Subject<{ id: number }>()
  private useLogAdded = new Subject<UseLog>()
  private useLogModified = new Subject<UseLog>()
  private useLogDeleted = new Subject<{ id: number }>()

  public getWalletStats() {
    return apiWithAuth<WalletStats[]>(api("voucher/wallets/stats"))
  }

  public getWallets(
    data: { semester?: string; user?: string; valid?: boolean } = {},
  ) {
    return apiWithAuth<Wallet[]>(buildUrl(api("voucher/wallets"), data))
  }

  public getWorkLogs(page = 1, limit = 50) {
    return apiWithAuth<Paginated<WorkLog>>(
      buildUrl(api("voucher/worklogs"), {
        page,
        limit,
      }),
    )
  }

  public useWorkLogs(page = 1, limit = 50) {
    const apiResult = useApiFetcher(() => this.getWorkLogs(page, limit), [
      page,
      limit,
    ])

    const pageRef = useRef(page)
    pageRef.current = page

    const [data, dispatch] = useActionCallingReducer(apiResult)

    useCrudEventsPaginated(
      this.workLogAdded,
      this.workLogModified,
      this.workLogDeleted,
      dispatch,
      pageRef,
    )

    useEffect(() => {
      dispatch(() => apiResult)
    }, [apiResult])

    return data
  }

  public getUseLogs(page = 1, limit = 50) {
    return apiWithAuth<Paginated<UseLog>>(
      buildUrl(api("voucher/uselogs"), {
        page,
        limit,
      }),
    )
  }

  public useUseLogs(page = 1, limit = 50) {
    const apiResult = useApiFetcher(() => this.getUseLogs(page, limit), [
      page,
      limit,
    ])

    const pageRef = useRef(page)
    pageRef.current = page

    const [data, dispatch] = useActionCallingReducer(apiResult)

    useCrudEventsPaginated(
      this.useLogAdded,
      this.useLogModified,
      this.useLogDeleted,
      dispatch,
      pageRef,
    )

    useEffect(() => {
      dispatch(() => apiResult)
    }, [apiResult])

    return data
  }

  public getUsers(search: string) {
    return apiWithAuth<Paginated<UserSimple>>(
      buildUrl(api("core/users"), {
        search,
        limit: 20,
      }),
    )
  }

  public getWorkGroups() {
    return apiWithAuth<WorkLog[]>(api("voucher/workgroups"))
  }

  public async registerWork(data: WorkLogCreate) {
    const result = await apiWithAuth<WorkLog>(
      api("voucher/worklogs"),
      "POST",
      data,
    )
    this.workLogAdded.next(result)
    return result
  }

  public async useVouchers(
    username: string,
    vouchers: number,
    comment: string,
  ) {
    const data: UseLogCreate = {
      vouchers,
      comment,
    }

    const result = await apiWithAuth<UseLog>(
      api(`voucher/users/${encodeURIComponent(username)}/use_vouchers`),
      "POST",
      data,
    )
    this.useLogModified.next(result)
    return result
  }

  public async updateWorkLog(id: number, data: WorkLogUpdate) {
    const result = await apiWithAuth<WorkLog>(
      api(`voucher/worklogs/${id}`),
      "PATCH",
      data,
    )
    this.workLogModified.next(result)
    return result
  }

  public async deleteWorkLog(id: number) {
    await apiWithAuth(api(`voucher/worklogs/${id}`), "DELETE")
    this.workLogDeleted.next({ id })
  }
}

export const voucherService = new VoucherService()
