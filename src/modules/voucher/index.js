import { Route } from 'react-router'
import reactor from '../../reactor'

import Stats from './components/Stats'
import UseLogs from './components/UseLogs'
import WorkLogs from './components/WorkLogs'

import StatsStore from './stores/StatsStore'
import UseLogsStore from './stores/UseLogsStore'
import WorkLogsStore from './stores/WorkLogsStore'

reactor.registerStores({
  stats: StatsStore,
  uselogs: UseLogsStore,
  worklogs: WorkLogsStore,
})

module.exports = (
  <Route>
    <Route name="voucher/stats" path="/voucher/stats" handler={Stats} />
    <Route name="voucher/uselogs" path="/voucher/uselogs" handler={UseLogs} />
    <Route name="voucher/worklogs" path="/voucher/worklogs" handler={WorkLogs} />
  </Route>
)
