import React from 'react'
import { Route } from 'react-router'
import reactor from '../../reactor'

import Stats from './components/Stats'
import SimpleUse from './components/SimpleUse'
import UseLogs from './components/UseLogs'
import Semester from './components/Semester'
import WorkLogs from './components/WorkLogs'

import StatsStore from './stores/StatsStore'
import UseLogsStore from './stores/UseLogsStore'
import WalletStore from './stores/WalletStore'
import WorkLogsStore from './stores/WorkLogsStore'

reactor.registerStores({
  voucherStats: StatsStore,
  voucherUselogs: UseLogsStore,
  voucherWallets: WalletStore,
  voucherWorklogs: WorkLogsStore,
})

module.exports = (
  <Route>
    <Route name="voucher/stats" path="/voucher" handler={Stats}>
      <Route name="voucher/semester" path="/voucher/semester/:semesterId" handler={Semester} />
    </Route>
    <Route name="voucher/uselogs" path="/voucher/uselogs" handler={UseLogs} />
    <Route name="voucher/use" path="/voucher/use" handler={SimpleUse} />
    <Route name="voucher/worklogs" path="/voucher/worklogs" handler={WorkLogs} />
  </Route>
)
