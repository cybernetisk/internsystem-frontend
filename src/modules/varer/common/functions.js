import Immutable from 'immutable'

export function updateQuery(name, value) {
  if (value === null) {
    value = undefined
  }

  let query = this.context.router.getCurrentQuery()
  query[name] = value

  this.context.router.transitionTo(
    this.context.router.getCurrentPathname(),
    this.context.router.getCurrentParams(),
    query
  )
}

export function fillCountSummer(count, raavare) {
  let sum = 0
  let pant = 0

  if (raavare.get('innpris')) {
    sum = Math.round(raavare.get('innpris').get('pris') * count.get('antall') * 100) / 100
    pant = Math.round(raavare.get('innpris').get('pant')
        * (count.get('antallpant') || Math.ceil(count.get('antall'))) * 100) / 100
  }

  return count.set('summer', Immutable.Map({
    count: count.get('antall'),
    sum: sum,
    pant: pant
  }))
}
