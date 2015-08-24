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
