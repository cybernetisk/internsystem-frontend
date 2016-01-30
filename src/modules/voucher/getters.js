const stats = ['voucherStats']
const uselogs = ['voucherUselogs']
const wallets = ['voucherWallets']
const worklogs = ['voucherWorklogs']

const current_semester = [
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

export default { current_semester, stats, uselogs, wallets, worklogs }
