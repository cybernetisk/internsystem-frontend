import Immutable from "immutable"

export const outdatedOptions = Immutable.fromJS({
  all: {
    text: "Show all products",
    filter: () => true,
  },
  outdated: {
    text: "Show only outdated products",
    filter: (product) => product.get("status") === "OLD",
  },
  hideoutdated: {
    text: "Hide outdated products",
    filter: (product) => product.get("status") !== "OLD",
  },
})

export const outdatedOptionsDefault = "hideoutdated"

export const inventoryCountOptions = outdatedOptions.merge(
  Immutable.fromJS({
    hideoutdated: {
      text: "Hide outdated products not counted",
      filter: (product) =>
        product.get("status") !== "OLD" || product.get("tellinger").size > 0,
    },
    counted: {
      text: "Show only products counted",
      filter: (product) => product.get("tellinger").size > 0,
    },
    groupsonly: {
      text: "Show only groups",
      filter: (product) => product.get("tellinger").size > 0,
    },
  }),
)

export const inventoryCountOptionsDefault = "counted"
