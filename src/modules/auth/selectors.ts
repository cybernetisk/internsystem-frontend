import { RootState } from "types"

export const getAuthState = (state: RootState) => state.auth
export const getIsLoggedIn = (state: RootState) => state.auth.data?.loggedIn
export const getUserDetails = (state: RootState) =>
  state.auth.data?.loggedIn ? state.auth.data.details : undefined
export const getCsrfToken = (state: RootState) => state.auth.data?.csrfToken
