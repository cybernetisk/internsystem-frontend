import angular from 'angular'
import Immutable from 'immutable'

/**
 * Hent ut liste over grupper beregnet for <select>
 */
export function extractGroups(items, groupKey) {
  var groupCount = {}

  return items.reduce(function (prev, cur) {
    if (!prev.some(function (obj) {
        return obj.id == cur[groupKey].id
      })) {
      groupCount[cur[groupKey].gruppe] = (groupCount[cur[groupKey].gruppe] || 0) + 1
      prev.push(cur[groupKey])
    }
    return prev
  }, []).sort(function (left, right) {
    return left.gruppe == right.gruppe
      ? left.navn.localeCompare(right.navn)
      : left.gruppe.localeCompare(right.gruppe)
  }).reduce(function (prev, cur) {
    if ((prev.length == 0 || prev[prev.length - 1].gruppe != cur.gruppe) && groupCount[cur.gruppe] > 1) {
      prev.push({
        id: cur.gruppe,
        compare: 'gruppe',
        compareValue: cur.gruppe,
        gruppe: cur.gruppe,
        navn: cur.gruppe + ' (all)'
      })
    }
    prev.push({
      id: cur.id,
      compare: 'id',
      compareValue: cur.id,
      gruppe: cur.gruppe,
      navn: cur.navn
    })
    return prev
  }, [])
}


export function extractGroupsImmutable(items, groupKey) {
  let groups = items
    .map(item => item.get(groupKey))
    .groupBy(group => group.get('id'))
    .map(groupGroup => groupGroup.first())

  let groupCount = groups
    .groupBy(group => group.get('gruppe'))
    .mapEntries(([groupKey, groupGroup]) => [groupKey, groupGroup.size])

  return groups
    .sort((left, right) => {
      return left.get('gruppe') == right.get('gruppe')
        ? left.get('navn').localeCompare(right.get('navn'))
        : left.get('gruppe').localeCompare(right.get('gruppe'))
    })
    .reduce((prev, cur) => {
      if (groupCount.get(cur.get('gruppe')) > 1 && (!prev.size || prev.last().get('gruppe') != cur.get('gruppe'))) {
        prev = prev.add(Immutable.fromJS({
          id: cur.get('gruppe'),
          compare: 'gruppe',
          compareValue: cur.get('gruppe'),
          gruppe: cur.get('gruppe'),
          navn: cur.get('gruppe') + ' (all)'
        }))
      }

      return prev.add(Immutable.fromJS({
        id: cur.get('id'),
        compare: 'id',
        compareValue: cur.get('id'),
        gruppe: cur.get('gruppe'),
        navn: cur.get('navn')
      }))
    }, Immutable.OrderedSet())
}


/**
 * Filtrering av varer
 */
export function createFilter(scope, filters, filtergroup, kontonavn, input, output) {
  var run = function () {
    var items = input()
    if (!items) return
    var g = extractGroups(items, kontonavn)

    var res = angular.injector(['cyb.oko']).get('$filter')('filter')(items, filters.text)
    if (filters.group) {
      var group = g.filter(function (test) {
        return test.id == filters.group
      })[0]
      res = res.filter(function (obj) {
        return obj[kontonavn][group.compare] == group.compareValue
      })
    }

    output(res)
  }

  scope.$watchCollection(filtergroup, run)

  return run
}

export function getFilter() {
  return angular.injector(['cyb.oko']).get('$filter')('filter')
}

/**
 * Sortering av råvarer/salgsvarer
 */
export function getSorter(kontoname, subGroup) {
  return function (left, right) {
    if (left[kontoname].gruppe != right[kontoname].gruppe)
      return left[kontoname].gruppe.localeCompare(right[kontoname].gruppe)

    if (subGroup && left[kontoname].navn != right[kontoname].navn)
      return left[kontoname].navn.localeCompare(right[kontoname].navn)

    if (left.kategori != right.kategori && left.kategori != null && right.kategori != null)
      return left.kategori.localeCompare(right.kategori)

    return left.navn.localeCompare(right.navn)
  }
}

export function getSorterImmutable(kontoname, subGroup) {
  return function (left, right) {
    if (left.get(kontoname).get('gruppe') != right.get(kontoname).get('gruppe'))
      return left.get(kontoname).get('gruppe').localeCompare(right.get(kontoname).get('gruppe'))

    if (subGroup && left.get(kontoname).get('navn') != right.get(kontoname).get('navn'))
      return left.get(kontoname).get('navn').localeCompare(right.get(kontoname).get('navn'))

    if (left.get('kategori') != right.get('kategori') && left.get('kategori') != null && right.get('kategori') != null)
      return left.get('kategori').localeCompare(right.get('kategori'))

    return left.get('navn').localeCompare(right.get('navn'))
  }
}
