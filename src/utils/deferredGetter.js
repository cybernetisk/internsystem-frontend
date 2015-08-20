import reactor from '../reactor'

export default function deferredGetter(getter) {
  return new Promise(resolve => {
    let res = reactor.evaluate(getter)
    if (res !== null) {
      resolve(res)
    } else {
      let destroyObserver = reactor.observe(getter, value => {
        resolve(res)
        destroyObserver()
      })
    }
  })
}
