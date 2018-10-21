export const stats = ['voucherStats']
export const uselogs = ['voucherUselogs']
export const wallets = ['voucherWallets']
export const worklogs = ['voucherWorklogs']

export const current_semester = [
  wallets,
  ['voucherStats', 'data'],
  (wallets, stats) => {
    if (!stats || !wallets.get('semester')) {
      return null
    }

    return stats.find(semester => {
      return semester.get('semester').get('id') == wallets.get('semester')
    }).get('semester')
  }
]
