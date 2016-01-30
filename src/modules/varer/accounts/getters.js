export const accounts = ['varerAccounts']

export const accountsLoader = [
  accounts,
  accounts => {
    return {
      isLoading: accounts.get('isLoading'),
      error: accounts.get('error'),
      isEmpty: accounts.get('items').isEmpty()
    }
  }
]