import { Semester, UserSimple } from "types"
import { ApiState } from "utils/api"

export interface WalletStats {
  semester: Semester
  sum_balance: string
  sum_vouchers: string
  sum_vouchers_used: number
  sum_hours: string
  count_users: number
}

export interface Wallet {
  id: number
  user: UserSimple
  semester: Semester
  cached_balance: string
  cached_hours: string
  cached_vouchers: string
  cached_vouchers_used: number
  is_valid: boolean
}

export interface WorkLog {
  id: number
  wallet: Wallet
  date_issued: string // 2019-12-07T03:31:39.477913+01:00
  date_worked: string // 2019-12-06
  work_group: string
  hours: string
  vouchers: string
  issuing_user: UserSimple
  comment: string
  can_edit: boolean
  can_delete: boolean
}

export interface WorkLogCreate {
  user: string
  date_worked: string
  work_group: string
  hours: number
  comment: string
}

export type WorkLogUpdate = Partial<WorkLog>

export interface UseLog {
  id: number
  wallet: Wallet
  date_spent: string // 2020-01-01T01:17:48.975674+01:00
  issuing_user: UserSimple
  comment: string
  vouchers: number
}

export interface UseLogCreate {
  vouchers: number
  comment?: string
}

export interface Workgroup {
  work_group: string
}

export type StatsState = ApiState<WalletStats>
export type UseLogsState = ApiState<UseLog[]>
