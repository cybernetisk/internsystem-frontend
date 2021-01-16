import Loader from "components/Loader"
import Pagination from "components/Pagination"
import { voucherService } from "modules/voucher/service"
import { UseLog } from "modules/voucher/types"
import React, { useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { antall } from "services/FormatService"
import { Paginated, useApiFetcher } from "utils/api"
import moment from "utils/moment"
import { getUserDetails } from "../../auth/selectors"
import { UseLogNew } from "./UseLogNew"
import "./UseLogs.scss"

function renderDateSpent(val: string) {
  return moment(val).format("dddd D. MMM YYYY HH:mm")
}

const RenderUseLogs = ({
  useLogs,
  setPage,
}: {
  useLogs: Paginated<UseLog>
  setPage(value: number): void
}) => (
  <div>
    <table className="table table-striped voucher-useLogsTable">
      <thead>
        <tr>
          <th>Time used</th>
          <th>Person</th>
          <th>Vouchers used</th>
          <th>Current balance</th>
          <th>Comment</th>
        </tr>
      </thead>
      <tbody>
        {useLogs.results.map((useLog) => {
          let who = useLog.wallet.user.username
          if (useLog.wallet.user.realname) {
            who += ` (${useLog.wallet.user.realname})`
          }
          return (
            <tr key={useLog.id}>
              <td>{renderDateSpent(useLog.date_spent)}</td>
              <td>{who}</td>
              <td>{useLog.vouchers}</td>
              <td>{antall(parseFloat(useLog.wallet.cached_balance))}</td>
              <td>
                {useLog.comment}
                {useLog.issuing_user.username !==
                  useLog.wallet.user.username && (
                  <div className="small text-muted">
                    Registered by {useLog.issuing_user.username}
                  </div>
                )}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
    <Pagination
      active={useLogs.page}
      pages={useLogs.pages}
      onChange={setPage}
    />
  </div>
)

const RenderNew = () => {
  const userDetails = useSelector(getUserDetails)

  if (userDetails) {
    return <UseLogNew defaultUsername={userDetails.username} />
  }

  return (
    <div className="alert alert-warning">
      You have to <Link to="/login">log in</Link> to register vouchers usage.
    </div>
  )
}

export const UseLogs = () => {
  const [page, setPage] = useState(1)
  const useLogs = useApiFetcher(() => voucherService.getUseLogs(page), [page])

  return (
    <div>
      <h1>Vouchers - use logs</h1>
      <p>
        If you have any problems go to{" "}
        <a href="https://cybernetisk.slack.com/messages/it/details/">#it</a> on
        Slack
      </p>
      <RenderNew />
      <Loader isLoading={!useLogs} />
      {useLogs && <RenderUseLogs useLogs={useLogs} setPage={setPage} />}
    </div>
  )
}
