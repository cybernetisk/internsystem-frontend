import reactor from "../reactor"

export default function deferredGetter(getter) {
  return new Promise((resolve) => {
    const res = reactor.evaluate(getter)
    if (res !== null) {
      resolve(res)
    } else {
      const destroyObserver = reactor.observe(getter, () => {
        resolve(res)
        destroyObserver()
      })
    }
  })
}
