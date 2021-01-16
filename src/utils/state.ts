import { MutableRefObject, useEffect, useReducer } from "react"
import { Subject } from "rxjs"

export function useActionCallingReducer<S>(initialState: S) {
  return useReducer((state: S, action: (state: S) => S) => {
    return action(state)
  }, initialState)
}

export function useCrudEventsPaginated<
  T extends { id: number },
  S extends { results: T[] } | null
>(
  added: Subject<T>,
  modified: Subject<T>,
  deleted: Subject<{ id: number }>,
  dispatch: (action: (state: S) => S) => void,
  pageRef: MutableRefObject<number>,
) {
  useEffect(() => {
    const subs = [
      added.subscribe({
        next: (value) =>
          dispatch((state) =>
            state != null && pageRef.current === 1
              ? {
                  ...state,
                  results: [value].concat(state.results),
                }
              : state,
          ),
      }),
      modified.subscribe({
        next: (value) =>
          dispatch((state) =>
            state?.results.some((it) => it.id === value.id)
              ? {
                  ...state,
                  results: state.results.map((it) =>
                    it.id == value.id ? value : it,
                  ),
                }
              : state,
          ),
      }),
      deleted.subscribe({
        next: ({ id }) =>
          dispatch((state) =>
            state?.results.some((it) => it.id === id)
              ? {
                  ...state,
                  results: state.results.filter((it) => it.id !== id),
                }
              : state,
          ),
      }),
    ]

    return () => subs.forEach((it) => it.unsubscribe)
  }, [])
}
