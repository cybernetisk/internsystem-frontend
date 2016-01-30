import Immutable from 'immutable'

// hack due to https://github.com/optimizely/nuclear-js/issues/210
export default function cacheGetter(cb) {
  let cacheKeys = Immutable.List()
  let cacheValue = null
  return (...args) => {
    if (cacheKeys.size != args.length || !cacheKeys.every((val, i) => args[i] === val)) {
      cacheKeys = Immutable.List(args)
      cacheValue = cb(...args)
    }

    return cacheValue
  }
}
