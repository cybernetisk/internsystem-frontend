import { Route } from 'react-router'
import reactor from '../../reactor'

import Stats from './components/Stats'
import UseLogs from './components/UseLogs'
import Semester from './components/Semester'
import WorkLogs from './components/WorkLogs'

import StatsStore from './stores/StatsStore'
import UseLogsStore from './stores/UseLogsStore'
import WalletStore from './stores/WalletStore'
import WorkLogsStore from './stores/WorkLogsStore'

reactor.registerStores({
  stats: StatsStore,
  uselogs: UseLogsStore,
  wallets: WalletStore,
  worklogs: WorkLogsStore,
})

module.exports = (
  <Route>
    <Route name="voucher/stats" path="/voucher" handler={Stats}>
      <Route name="voucher/semester" path="/voucher/semester/:semesterId" handler={Semester} />
    </Route>
    <Route name="voucher/uselogs" path="/voucher/uselogs" handler={UseLogs} />
    <Route name="voucher/worklogs" path="/voucher/worklogs" handler={WorkLogs} />
  </Route>
)
