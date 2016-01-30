import {pageLimit} from '../service'

export const listStore = ['varerInventoryCounts']

export const activePage = [
  listStore,
  (store) => store.get('activePage')
]

export const numPages = [
  listStore,
  (store) => Math.ceil(store.get('count') / pageLimit)
]

export const list = [
  listStore,
  (store) => store.get('items')
]

export const listLoader = [
  listStore,
  (store) => {
    return {
      isLoading: store.get('isLoading'),
      error: store.get('error'),
      isEmpty: store.get('items').isEmpty()
    }
  }
]
