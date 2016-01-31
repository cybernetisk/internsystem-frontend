import Immutable from 'immutable'
import { toImmutable } from 'nuclear-js'
import {fillBuyPrice, fillSellPrice} from '../../inventoryItems/service'
import {fillCountSummer} from '../../common/functions'

import cacheGetter from '../../../../utils/cacheGetter'
import deepSearchPredicate from '../../../../utils/deepSearchPredicate'

import * as inventoryItemGetters from '../../inventoryItems/getters'
import * as VarerHelper from '../../common/VarerHelper'
import * as consts from '../../consts'


export const inventoryCountStore = ['varerInventoryCount']
export const filters = ['varerInventoryCountFilter']


const allRaavarerWithData = [
  inventoryItemGetters.items,
  ['varerInventoryCount', 'data', 'tid'],
  cacheGetter((inventoryItems, inventoryCountTime) => {
    let date = inventoryCountTime ? new Date(inventoryCountTime) : null
    return inventoryItems
      .map(item => fillBuyPrice(item, date))
      .map(item => fillSellPrice(item, date))
      .sort(VarerHelper.getSorterImmutable('innkjopskonto', true))
  })
]

const raavarerCounted = [
  ['varerInventoryCount', 'data', 'varer'],
  cacheGetter(varer => {
    return Immutable.List(varer).reduce((list, item) => {
      const raavare_id = item.get('raavare')
      return list.set(raavare_id, list.get(raavare_id, Immutable.List()).push(item))
    }, Immutable.Map())
  })
]

const allRaavarerWithCounts = [
  raavarerCounted,
  allRaavarerWithData,
  cacheGetter((raavarerCounted, allRaavarerWithData) => {
    return allRaavarerWithData.map(raavare => {
      raavare = raavare
        .set('tellinger', raavarerCounted.get(raavare.get('id'), Immutable.List())
          .map(telling => fillCountSummer(telling, raavare)))

      raavare = raavare
        .set('summer', Immutable.Map(raavare.get('tellinger').reduce((prev, telling) => {
          prev.count += telling.get('summer').get('count')
          prev.sum += telling.get('summer').get('sum')
          prev.pant += telling.get('summer').get('pant')
          return prev
        }, {count: 0, sum: 0, pant: 0})))

      return raavare;
    })
  })
]

const accountsWithGroupHeaders = [
  allRaavarerWithCounts,
  cacheGetter(allRaavarerWithCounts => {
    return VarerHelper.extractGroupsImmutable(allRaavarerWithCounts, 'innkjopskonto')
  })
]

export const filteredList = [
  allRaavarerWithCounts,
  filters,
  accountsWithGroupHeaders,
  cacheGetter((allRaavarerWithCounts, filters, accounts) => {
    allRaavarerWithCounts = allRaavarerWithCounts.filter(consts.inventoryCountOptions.get(filters.get('f')).get('filter'))

    if (filters.get('group') !== null) {
      let compareGroup = accounts.find(g => g.get('id') === filters.get('group'))
      allRaavarerWithCounts = allRaavarerWithCounts
        .filter(item => item.get('innkjopskonto').get(compareGroup.get('compare')) === compareGroup.get('compareValue'))
    }

    if (filters.get('text', '') !== '') {
      // match each word individually
      let words = filters.get('text').match(/\S+\s*/g)
      if (words) {
        words.forEach(word => {
          allRaavarerWithCounts = allRaavarerWithCounts.filter(deepSearchPredicate(word.trim()))
        })
      }
    }

    return allRaavarerWithCounts
  })
]

const makeAccounts = raavarer => {
  return raavarer
    .map(item => item.get('innkjopskonto'))
    .groupBy(account => account.get('id'))
    .map(group => group.first())
    .sort((left, right) => {
      return left.get('gruppe') == right.get('gruppe')
        ? left.get('navn').localeCompare(right.get('navn'))
        : left.get('gruppe').localeCompare(right.get('gruppe'))
    })
}

const accounts = [
  allRaavarerWithCounts,
  cacheGetter(makeAccounts)
]

const accountsFiltered = [
  filteredList,
  cacheGetter(makeAccounts)
]

export const accountsForSelectElement = [
  accountsWithGroupHeaders,
  accounts => accounts.groupBy(account => account.get('gruppe'))
]

const makeAccountsSummer = raavarer => {
  return toImmutable(raavarer.reduce((prev, raavare) => {
    const account_id = raavare.getIn(['innkjopskonto', 'id'])

    if (!prev[account_id]) {
      prev[account_id] = {count: 0, sum: 0, pant: 0}
    }

    prev[account_id].count += raavare.getIn(['summer', 'count'])
    prev[account_id].sum += raavare.getIn(['summer', 'sum'])
    prev[account_id].pant += raavare.getIn(['summer', 'pant'])

    return prev
  }, {})).mapKeys(key => parseInt(key))
}

export const accountsSummer = [
  allRaavarerWithCounts,
  cacheGetter(makeAccountsSummer)
]

export const accountsSummerFiltered = [
  filteredList,
  cacheGetter(makeAccountsSummer)
]

const accountGroupsSummerFiltered = [
  accountsFiltered,
  accountsSummerFiltered,
  cacheGetter((accounts, accountsSummer) => {
    return toImmutable(accounts.reduce((prev, account) => {
      const group_name = account.get('gruppe')

      if (!prev[group_name]) {
        prev[group_name] = {count: 0, sum: 0, pant: 0}
      }

      prev[group_name].count += accountsSummer.getIn([account.get('id'), 'count'])
      prev[group_name].sum += accountsSummer.getIn([account.get('id'), 'sum'])
      prev[group_name].pant += accountsSummer.getIn([account.get('id'), 'pant'])
      return prev
    }, {}))
  })
]

export const groupsViewData = [
  accountsFiltered,
  accountsSummerFiltered,
  accountGroupsSummerFiltered,
  cacheGetter((accounts, accountsSummer, accountGroupsSummer) => {
    return accounts.groupBy(account => account.get('gruppe'))
      .map((groupAccounts, groupName) => {
        return Immutable.Map({
          accounts: groupAccounts.map(groupAccount => {
            return Immutable.Map({
              data: groupAccount,
              summer: accountsSummer.get(groupAccount.get('id'))
            })
          }),
          summer: accountGroupsSummer.get(groupName)
        })
      })
  })
]

export const totalSummer = [
  accountsSummer,
  cacheGetter(accountsSummer => {
    return Immutable.Map(accountsSummer.reduce((prev, accountSummer) => {
      prev.count += accountSummer.get('count')
      prev.sum += accountSummer.get('sum')
      prev.pant += accountSummer.get('pant')
      return prev
    }, {count: 0, sum: 0, pant: 0}))
  })
]

export const totalSummerFiltered = [
  accountsSummerFiltered,
  cacheGetter(accountsSummer => {
    return Immutable.Map(accountsSummer.reduce((prev, accountSummer) => {
      prev.count += accountSummer.get('count')
      prev.sum += accountSummer.get('sum')
      prev.pant += accountSummer.get('pant')
      return prev
    }, {count: 0, sum: 0, pant: 0}))
  })
]
