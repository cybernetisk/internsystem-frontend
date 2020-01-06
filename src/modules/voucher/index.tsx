import React from "react"
import { Route } from "react-router"
import { SemesterPage } from "./components/Semester"
import { Stats } from "./components/Stats"
import { UseLogNewSimple } from "./components/UseLogNewSimple"
import { UseLogs } from "./components/UseLogs"
import { WorkLogs } from "./components/WorkLogs"

export default (
  <React.Fragment>
    <Route
      exact
      path="/voucher/stats"
      render={() => (
        <Stats>
          <Route
            exact
            path="/voucher/semester/:semesterId"
            component={SemesterPage}
          />
        </Stats>
      )}
    />
    <Route exact path="/voucher/uselogs" component={UseLogs} />
    <Route exact path="/voucher/use" component={UseLogNewSimple} />
    <Route exact path="/voucher/worklogs" component={WorkLogs} />
  </React.Fragment>
)
