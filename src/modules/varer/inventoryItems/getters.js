import {fillBuyPrice, fillSellPrice} from './service'
import {extractGroupsImmutable, getSorterImmutable} from '../common/VarerHelper'

import deepSearchPredicate from '../../../utils/deepSearchPredicate'

import * as consts from '../consts'

export const listStore = ['varerInventoryItems']

export const filters = ['varerInventoryItems', 'filters']

export const items = ['varerInventoryItems', 'items']

export const inventoryItemsLoader = [
  ['varerInventoryItems', 'isLoading'],
  ['varerInventoryItems', 'error'],
  ['varerInventoryItems', 'items'],
  (isLoading, error, items) => {
    return {
      isLoading,
      error,
      isEmpty: items.isEmpty()
    }
  }
]

export const inventoryItemsTransformed = [
  items,
  items => items
    .map(item => fillBuyPrice(item))
    .map(item => fillSellPrice(item))
    .sort(getSorterImmutable('innkjopskonto'))
]

export const groups = [
  inventoryItemsTransformed,
  inventoryItems => extractGroupsImmutable(inventoryItems, 'innkjopskonto')
]

export const selectGroups = [
  groups,
  groups => groups.groupBy(group => group.get('gruppe'))
]

export const filteredInventoryItems = [
  inventoryItemsTransformed,
  filters,
  groups,
  (inventoryItems, filters, groups) => {
    inventoryItems = inventoryItems.filter(consts.outdatedOptions.get(filters.get('outdated')).get('filter'))

    if (filters.get('group') !== null) {
      let compareGroup = groups.find(g => g.get('id') === filters.get('group'))
      inventoryItems = inventoryItems
        .filter(item => item.get('innkjopskonto').get(compareGroup.get('compare')) === compareGroup.get('compareValue'))
    }

    if (filters.get('text', '') !== '') {
      // match each word individually
      let words = filters.get('text').match(/\S+\s*/g)
      if (words) {
        words.forEach(word => {
          inventoryItems = inventoryItems.filter(deepSearchPredicate(word.trim()))
        })
      }
    }

    return inventoryItems
  }
]
