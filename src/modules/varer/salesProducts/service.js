import { api } from "../../../api"
import reqwest from "../../../utils/reqwest"

export function getSalesProducts() {
  return reqwest({
    url: api("varer/salgsvarer"),
    type: "json",
  })
}
