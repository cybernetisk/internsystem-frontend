import {fillBuyPrice, fillSellPrice} from '../../inventoryItems/service'
import {fillCountSummer} from '../../common/functions'
import cacheGetter from '../../../../utils/cacheGetter'

const itemStoreKey = 'varerInventoryCount'
const countsStoreKey = 'varerInventoryCountCounts'

export const isLoading = [
  [itemStoreKey, 'isLoading'],
  [countsStoreKey, 'isLoading'],
  (itemLoading, countsLoading) => {
    return itemLoading || countsLoading
  }
]

export const error = [
  [itemStoreKey, 'error'],
  [countsStoreKey, 'error'],
  (itemError, countsError) => {
    return itemError || countsError
  }
]

export const data = [itemStoreKey, 'data']

export const counts = [
  [countsStoreKey, 'data'],
  [itemStoreKey, 'data', 'tid'],
  cacheGetter((counts, time) => {
    time = time ? new Date(time) : null

    return counts.map(count => {
      let count_time = count.get('time_price')
      count_time = count_time ? new Date(count_time) : time

      count = count.set('raavare', fillBuyPrice(count.get('raavare'), count_time))
      return fillCountSummer(count, count.get('raavare'))
    })
  })
]

export const time = [itemStoreKey, 'data', 'tid']
