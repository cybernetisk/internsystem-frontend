import reactor from '../reactor'

export function dispatchAsync(promise, types, extra = {}) {
  const {request, success, failure} = types

  reactor.dispatch(request, extra)

  promise.then(
      response => reactor.dispatch(success, {...extra, response}),
      error => reactor.dispatch(failure, {...extra, error})
  )
}
