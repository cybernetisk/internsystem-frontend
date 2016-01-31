import {fillBuyPrice, fillSellPrice} from '../../inventoryItems/service'
import {fillCountSummer} from '../../common/functions'
import cacheGetter from '../../../../utils/cacheGetter'

const storeKey = 'varerInventoryCountRegistrations'

export const isLoading = [storeKey, 'isLoading']

export const error = [storeKey, 'error']

export const data = [storeKey, 'data']

export const counts = [
  [storeKey, 'data', 'varer'],
  [storeKey, 'data', 'tid'],
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

export const time = [storeKey, 'data', 'tid']
