import { api } from "../../../api"
import reqwest from "../../../utils/reqwest"

export function getSalesEstimates() {
  return reqwest({
    url: api("varer/salgskalkyler"),
    type: "json",
  })
}
