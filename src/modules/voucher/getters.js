const stats = ['stats']
const uselogs = ['uselogs']
const wallets = ['wallets']
const worklogs = ['worklogs']

const current_semester = [
  wallets,
  stats,
  (wallets, stats) => {
    if (!stats.get('data') || !wallets.get('semester')) {
      return null
    }

    return stats.get('data').find(semester => {
      return semester.get('semester').get('id') == wallets.get('semester')
    }).get('semester')
  }
]

export default { current_semester, stats, uselogs, wallets, worklogs }
