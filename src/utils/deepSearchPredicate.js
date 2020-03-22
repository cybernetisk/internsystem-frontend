import Immutable from "immutable"

function deepCompare(actual, expected, comparator) {
  if (Immutable.List.isList(actual) || Immutable.Map.isMap(actual)) {
    return actual.some((item) => deepCompare(item, expected, comparator))
  } else {
    return comparator(actual, expected)
  }
}

export default function deepSearchPredicate(expression, comparator) {
  if (comparator === true) {
    comparator = (actual, expected) => actual === expected
  } else if (typeof comparator !== "function") {
    comparator = (actual, expected) => {
      if (actual === undefined || actual === null) {
        return false
      }
      actual = (actual + "").toLowerCase()
      return actual.indexOf(expected.toLowerCase()) !== -1
    }
  }

  return (actual) => deepCompare(actual, expression, comparator)
}
