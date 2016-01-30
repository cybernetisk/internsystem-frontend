import {pageLimit} from '../service'

export const listStore = ['varerInventoryCounts']

export const activePage = ['varerInventoryCounts', 'activePage']

export const numPages = [
  ['varerInventoryCounts', 'count'],
  count => Math.ceil(count / pageLimit)
]

export const list = ['varerInventoryCounts', 'items']

export const listLoader = [
  listStore,
  store => {
    return {
      isLoading: store.get('isLoading'),
      error: store.get('error'),
      isEmpty: store.get('items').isEmpty()
    }
  }
]
