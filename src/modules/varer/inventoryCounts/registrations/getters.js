import cacheGetter from "../../../../utils/cacheGetter"
import { fillCountSummer } from "../../common/functions"
import { fillBuyPrice } from "../../inventoryItems/service"

const itemStoreKey = "varerInventoryCount"
const countsStoreKey = "varerInventoryCountCounts"

export const isLoading = [
  [itemStoreKey, "isLoading"],
  [countsStoreKey, "isLoading"],
  (itemLoading, countsLoading) => {
    return itemLoading || countsLoading
  },
]

export const error = [
  [itemStoreKey, "error"],
  [countsStoreKey, "error"],
  (itemError, countsError) => {
    return itemError || countsError
  },
]

export const data = [itemStoreKey, "data"]

export const counts = [
  [countsStoreKey, "data"],
  [itemStoreKey, "data", "tid"],
  cacheGetter((counts, time) => {
    time = time ? new Date(time) : null

    return counts.map(count => {
      let countTime = count.get("time_price")
      countTime = countTime ? new Date(countTime) : time

      count = count.set(
        "raavare",
        fillBuyPrice(count.get("raavare"), countTime),
      )
      return fillCountSummer(count, count.get("raavare"))
    })
  }),
]

export const time = [itemStoreKey, "data", "tid"]
