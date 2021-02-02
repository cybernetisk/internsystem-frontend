import { StateType } from "typesafe-actions"

declare module "*.scss" {
  const value: {
    [key: string]: string
  }
  export default value
}

interface CustomWindow extends Window {
  BACKEND_URL: string
}

// From Webpack config.
declare const __BUILD_INFO__: {
  buildTime: string
  gitCommitShort: string
}

export type Store = StateType<typeof import("./store").store>
export type RootAction = import("./store").rootAction
export type RootState = StateType<typeof import("./store").rootReducer>

declare module "typesafe-actions" {
  interface Types {
    RootAction: RootAction
  }
}

// From core.
export interface Semester {
  id: 14
  year: 2019
  semester: "2-FALL"
}

// From core.
export interface UserSimple {
  id: number
  username: string
  realname: string
}

// From core.
export interface UserExtended {
  id: number
  username: string
  realname: string
  email: string
  is_superuser: boolean
  is_staff: boolean
  is_active: boolean
  date_joined: string // 2014-12-19T21:04:59+01:00
  groups: {
    id: number
    name: string
    permissions: number[]
  }[]
  user_permissions: unknown
  phone_number: ""
}
