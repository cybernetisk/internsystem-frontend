import Loader from "components/Loader"
import Pagination from "components/Pagination"
import { getIsLoggedIn } from "modules/auth/selectors"
import { voucherService } from "modules/voucher/service"
import { WorkLog } from "modules/voucher/types"
import React, { useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Paginated } from "utils/api"
import { WorkLogItem } from "./WorkLogItem"
import { WorkLogNew } from "./WorkLogNew"
import "./WorkLogs.scss"

const RenderNew = () => {
  const isLoggedIn = useSelector(getIsLoggedIn)

  if (isLoggedIn) {
    return <WorkLogNew />
  }

  return (
    <div className="alert alert-warning">
      You have to <Link to="/login">log in</Link> to register work.
    </div>
  )
}

const RenderWorkLogs = ({
  worklogs,
  setPage,
}: {
  worklogs: Paginated<WorkLog>
  setPage(value: number): void
}) => {
  const showLastCol = worklogs.results.some(
    (it) => it.can_edit || it.can_delete,
  )

  return (
    <div>
      <table className="table table-striped voucher-workLogsTable">
        <thead>
          <tr>
            <th>Date worked</th>
            <th>Person</th>
            <th>Work group</th>
            <th>Hours</th>
            <th>Current balance</th>
            <th>Comment</th>
            {showLastCol && <th />}
          </tr>
        </thead>
        <tbody>
          {worklogs.results.map((worklog) => (
            <WorkLogItem
              key={worklog.id}
              worklog={worklog}
              showLastCol={showLastCol}
            />
          ))}
        </tbody>
      </table>
      <Pagination
        active={worklogs.page}
        pages={worklogs.pages}
        onChange={setPage}
      />
    </div>
  )
}

export const WorkLogs = () => {
  const [page, setPage] = useState(1)
  const worklogs = voucherService.useWorkLogs(page)

  return (
    <div>
      <h1>Vouchers - work logs</h1>
      <p>
        If you have any problems go to{" "}
        <a href="https://cybernetisk.slack.com/messages/it/details/">#it</a> on
        Slack
      </p>
      <RenderNew />
      <Loader isLoading={!worklogs} />
      {worklogs && <RenderWorkLogs worklogs={worklogs} setPage={setPage} />}
    </div>
  )
}
