import { api } from "../../../api"
import reqwest from "../../../utils/reqwest"

export function getInventoryItems() {
  return reqwest({
    url: api("varer/råvarer"),
    type: "json",
  })
}

function getLastPossible(list, date = null) {
  if (date !== null) {
    return (
      list.findLast(item => date >= new Date(item.get("dato"))) || list.last()
    )
  } else {
    return list.last()
  }
}

export function fillBuyPrice(inventoryItem, priceDate = null) {
  const prices = inventoryItem
    .get("priser")
    .filter(price => price.get("aktiv"))
    .sortBy(price => new Date(price.get("dato")))

  return inventoryItem.set(
    "innpris",
    getLastPossible(prices, priceDate ? new Date(priceDate) : null),
  )
}

function getDateMidnight(date) {
  const d = new Date(date)
  d.setUTCHours(0, 0, 0)
  return d
}

export function fillSellPrice(inventoryItem, priceDate = null) {
  const statusSuggestion = "FOR"

  if (!inventoryItem.get("lenket_salgsvare")) {
    return inventoryItem
  }

  const prices = inventoryItem
    .get("lenket_salgsvare")
    .get("priser")
    .filter(price => price.get("status") !== statusSuggestion)
    .sortBy(price => getDateMidnight(price.get("dato")))

  return inventoryItem.set(
    "salgspris",
    getLastPossible(prices, priceDate ? new Date(priceDate) : null),
  )
}

export function getInPrices(inventoryItemId) {
  return reqwest({
    url: api("varer/inprices"),
    data: {
      raavare: inventoryItemId,
    },
    type: "json",
  })
}
