import Immutable from "immutable"

/**
 * Hent ut liste over grupper beregnet for <select>
 */
export function extractGroupsImmutable(items, groupKey) {
  const groups = items
    .map((item) => item.get(groupKey))
    .groupBy((group) => group.get("id"))
    .map((groupGroup) => groupGroup.first())

  const groupCount = groups
    .groupBy((group) => group.get("gruppe"))
    .mapEntries(([groupKey, groupGroup]) => [groupKey, groupGroup.size])

  return groups
    .sort((left, right) => {
      return left.get("gruppe") == right.get("gruppe")
        ? left.get("navn").localeCompare(right.get("navn"))
        : left.get("gruppe").localeCompare(right.get("gruppe"))
    })
    .reduce((prev, cur) => {
      if (
        groupCount.get(cur.get("gruppe")) > 1 &&
        (!prev.size || prev.last().get("gruppe") != cur.get("gruppe"))
      ) {
        prev = prev.add(
          Immutable.fromJS({
            id: cur.get("gruppe"),
            compare: "gruppe",
            compareValue: cur.get("gruppe"),
            gruppe: cur.get("gruppe"),
            navn: cur.get("gruppe") + " (all)",
          }),
        )
      }

      return prev.add(
        Immutable.fromJS({
          id: cur.get("id"),
          compare: "id",
          compareValue: cur.get("id"),
          gruppe: cur.get("gruppe"),
          navn: cur.get("navn"),
        }),
      )
    }, Immutable.OrderedSet())
}

/**
 * Sortering av råvarer/salgsvarer
 */
export function getSorterImmutable(kontoname, subGroup) {
  return function (left, right) {
    if (left.get(kontoname).get("gruppe") != right.get(kontoname).get("gruppe"))
      return left
        .get(kontoname)
        .get("gruppe")
        .localeCompare(right.get(kontoname).get("gruppe"))

    if (
      subGroup &&
      left.get(kontoname).get("navn") != right.get(kontoname).get("navn")
    )
      return left
        .get(kontoname)
        .get("navn")
        .localeCompare(right.get(kontoname).get("navn"))

    if (
      left.get("kategori") != right.get("kategori") &&
      left.get("kategori") != null &&
      right.get("kategori") != null
    )
      return left.get("kategori").localeCompare(right.get("kategori"))

    return left.get("navn").localeCompare(right.get("navn"))
  }
}
