import deepSearchPredicate from "../../../utils/deepSearchPredicate"
import {
  extractGroupsImmutable,
  getSorterImmutable,
} from "../common/VarerHelper"
import * as consts from "./../consts"

export const listStore = ["varerSalesProducts"]

export const filters = [listStore, (store) => store.get("filters")]

export const items = [listStore, (store) => store.get("items")]

function getQuantityAfterSpoilage(metaRaavare) {
  // beregn kun svinn dersom enheten "brytes"
  return metaRaavare.get("mengde") != metaRaavare.get("raavare").get("mengde")
    ? metaRaavare.get("raavare").get("mengde") -
        metaRaavare.get("raavare").get("mengde_svinn")
    : metaRaavare.get("raavare").get("mengde")
}

function fillBuyPrice(salesProduct) {
  salesProduct = salesProduct.set(
    "raavarer",
    salesProduct.get("raavarer").map((metaRaavare) => {
      const price = metaRaavare
        .get("raavare")
        .get("priser")
        .filter((price) => price.get("aktiv"))
        .maxBy((price) => price.get("dato"))

      return metaRaavare
        .set("innpris", price)
        .set(
          "innpris_accurate",
          price
            ? (price.get("pris") /
                price.get("antall") /
                getQuantityAfterSpoilage(metaRaavare)) *
                metaRaavare.get("mengde")
            : 0,
        )
    }),
  )

  return salesProduct.set(
    "innpris",
    salesProduct.get("raavarer").reduce((prev, cur) => {
      return prev + cur.get("innpris_accurate")
    }, 0),
  )
}

export const salesProductsLoader = [
  listStore,
  (store) => {
    return {
      isLoading: store.get("isLoading"),
      error: store.get("error"),
      isEmpty: store.get("items").isEmpty(),
    }
  },
]

export const salesProductsTransformed = [
  items,
  (items) =>
    items
      .map((item) => {
        item = fillBuyPrice(item)

        // finn aktiv salgspris
        item = item.set(
          "salgspris",
          item
            .get("priser")
            .filter((price) => price.get("status") !== "FOR")
            .maxBy((price) => price.get("dato")),
        )

        return item
      })
      .sort(getSorterImmutable("salgskonto")),
]

export const groups = [
  salesProductsTransformed,
  (salesProducts) => extractGroupsImmutable(salesProducts, "salgskonto"),
]

export const selectGroups = [
  groups,
  (groups) => groups.groupBy((group) => group.get("gruppe")),
]

export const filteredSalesProducts = [
  salesProductsTransformed,
  filters,
  groups,
  (salesProducts, filters, groups) => {
    salesProducts = salesProducts.filter(
      consts.outdatedOptions.get(filters.get("outdated")).get("filter"),
    )

    if (filters.get("group") !== null) {
      const compareGroup = groups.find(
        (g) => g.get("id") === filters.get("group"),
      )
      salesProducts = salesProducts.filter(
        (item) =>
          item.get("salgskonto").get(compareGroup.get("compare")) ===
          compareGroup.get("compareValue"),
      )
    }

    if (filters.get("text", "") !== "") {
      // match each word individually
      const words = filters.get("text").match(/\S+\s*/g)
      if (words) {
        words.forEach((word) => {
          salesProducts = salesProducts.filter(deepSearchPredicate(word.trim()))
        })
      }
    }

    return salesProducts
  },
]
