import reqwest from 'reqwest'
import {api} from '../../../api'

export const pageLimit = 500

export function getInventoryItems(page) {
  return reqwest({
    url: api(`varer/råvarer`),
    data: {limit: pageLimit, page},
    type: 'json'
  })
}

export function fillBuyPrice(inventoryItem, priceDate = null) {
  let prices = inventoryItem.get('priser')
    .filter(price => price.get('aktiv'))
    .sortBy(price => new Date(price.get('dato')))

  return inventoryItem
    .set('innpris', getLastPossible(prices, priceDate ? new Date(priceDate) : null))
}

export function fillSellPrice(inventoryItem, priceDate = null) {
  const statusSuggestion = 'FOR'

  if (!inventoryItem.get('lenket_salgsvare')) {
    return inventoryItem
  }

  let prices = inventoryItem.get('lenket_salgsvare').get('priser')
    .filter(price => price.get('status') !== statusSuggestion)
    .sortBy(price => getDateMidnight(price.get('dato')))

  return inventoryItem
    .set('salgspris', getLastPossible(prices, priceDate ? new Date(priceDate) : null))
}

function getLastPossible(list, date = null) {
  if (date !== null) {
    return list.findLast(item => date >= new Date(item.get('dato'))) || list.last()
  } else {
    return list.last()
  }
}

function getDateMidnight(date) {
  let d = new Date(date)
  d.setUTCHours(0, 0, 0)
  return d
}

export function getInPrices(inventoryItemId) {
  return reqwest({
    url: api(`varer/inprices`),
    data: {
      raavare: inventoryItemId
    },
    type: 'json'
  })
}
