import { ApiState } from "utils/api"

export interface AuthDataGuest {
  loggedIn: false
  csrfToken: string
}

export interface UserDetails {
  username: string
  realname: string
  email: string
}

export interface AuthDataLoggedIn {
  loggedIn: true
  details: UserDetails
  metadata: null | Record<string, string[]>
  csrfToken: string
}

export type AuthData = AuthDataGuest | AuthDataLoggedIn

export type AuthState = ApiState<AuthData>
