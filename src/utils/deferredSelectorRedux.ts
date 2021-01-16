import { store } from "store"
import { RootState } from "types"

export function deferredSelectorRedux<T>(selector: (state: RootState) => T) {
  return new Promise<Exclude<T, undefined>>((resolve) => {
    function checkState() {
      const result = selector(store.getState())
      if (result != null) {
        resolve(result as Exclude<T, undefined>)
        return true
      }
      return false
    }

    if (!checkState()) {
      const unsubscribe = store.subscribe(() => {
        if (checkState()) {
          unsubscribe()
        }
      })
    }
  })
}
