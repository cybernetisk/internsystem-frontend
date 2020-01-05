import { api } from "../../../api"
import reqwest from "../../../utils/reqwest"

export function getAccounts() {
  return reqwest({
    url: api("varer/kontoer"),
    type: "json",
  })
}
