export interface AuthDataGuest {
  loggedIn: false
  csrfToken: string
}

export interface AuthDataLoggedIn {
  loggedIn: true
  details: {
    username: string
    realname: string
    email: string
  }
  metadata: null | Record<string, string[]>
  csrfToken: string
}

export type AuthData = AuthDataGuest | AuthDataLoggedIn

export interface AuthState {
  data: AuthData | null
  error: Error | null
  isLoading: boolean
}
