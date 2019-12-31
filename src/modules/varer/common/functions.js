import Immutable from 'immutable'
import queryString from 'query-string'

export function createQueryUpdater(history) {
  return function updateQuery(name, value) {
    if (value === null) {
      value = undefined
    }

    let query = queryString.parse(history.location.search)
    query[name] = value

    const search = Object.keys(query).length > 0
      ? `?${queryString.stringify(query)}`
      : ''

    history.push(history.location.pathname + search)
  }
}

export function fillCountSummer(count, raavare) {
  let sum = 0
  let pant = 0

  if (raavare.get('innpris')) {
    sum = Math.round(raavare.get('innpris').get('pris') / raavare.get('innpris').get('antall') * count.get('antall') * 100) / 100
    pant = Math.round(raavare.get('innpris').get('pant')
        / raavare.get('innpris').get('antall')
        * (count.get('antallpant') || Math.ceil(count.get('antall'))) * 100) / 100
  }

  return count.set('summer', Immutable.Map({
    count: count.get('antall'),
    sum: sum,
    pant: pant
  }))
}
