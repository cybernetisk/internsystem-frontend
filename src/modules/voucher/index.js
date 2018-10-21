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

export default (
  <React.Fragment>
    <Route
      path="/voucher"
      render={() => (
        <Stats>
          <Route exact path="/voucher/semester/:semesterId" component={Semester} />
        </Stats>
      )}
    />
    <Route exact path="/voucher/uselogs" component={UseLogs} />
    <Route exact path="/voucher/use" component={SimpleUse} />
    <Route exact path="/voucher/worklogs" component={WorkLogs} />
  </React.Fragment>
)
