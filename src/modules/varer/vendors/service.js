import { api } from "../../../api"
import reqwest from "../../../utils/reqwest"

export function getVendors() {
  return reqwest({
    url: api("varer/leverandører"),
    type: "json",
  })
}
