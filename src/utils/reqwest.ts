import reqwest from "reqwest"
import { getCsrfToken } from "../modules/auth/selectors"
import { deferredSelectorRedux } from "./deferredSelectorRedux"

// TODO: Replace reqwest with plain fetch.
export default async function reqwestWithCsrf<T extends unknown[]>(...args: T) {
  const csrfToken = await deferredSelectorRedux(getCsrfToken)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const firstArg = args[0] as Record<any, any>

  if (!firstArg.headers) {
    firstArg.headers = {}
  }
  firstArg.headers["X-CSRFToken"] = csrfToken
  firstArg.withCredentials = true

  console.log("args to reqwest", args)
  return reqwest(...args)
}
