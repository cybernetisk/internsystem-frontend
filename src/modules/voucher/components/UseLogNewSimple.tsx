import Loader from "components/Loader"
import { getUserDetails } from "modules/auth/selectors"
import { UserDetails } from "modules/auth/types"
import { voucherService } from "modules/voucher/service"
import { UseLog } from "modules/voucher/types"
import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useApiFetcher } from "utils/api"
import moment from "utils/moment"
import { UseLogNew } from "./UseLogNew"
import "./UseLogNewSimple.scss"

function renderDateSpent(val: string) {
  return moment(val).format("dddd D. MMM YYYY HH:mm")
}

const UseLogs = ({ useLogs }: { useLogs: UseLog[] }) => (
  <div>
    <hr />
    <h3>Previous registrations</h3>
    <ul className="voucher-useLogNewSimple">
      {useLogs.map(useLog => {
        let who
        if (useLog.wallet.user.realname) {
          who = useLog.wallet.user.realname
        } else {
          who = useLog.wallet.user.username
        }

        return (
          <li key={useLog.id}>
            <span className="voucher-useLogNewSimple-when">
              {renderDateSpent(useLog.date_spent)}
            </span>
            <span className="voucher-useLogNewSimple-who">{who}</span>
            <span className="voucher-useLogNewSimple-amount">
              {useLog.vouchers} voucher(s)
            </span>
          </li>
        )
      })}
    </ul>
    <Link to="/voucher/uselogs">View all usage</Link>
  </div>
)

const New = ({ userDetails }: { userDetails?: UserDetails }) => {
  if (userDetails) {
    return <UseLogNew defaultUsername={userDetails.username} hidePanel={true} />
  }

  return (
    <div className="alert alert-warning">
      You have to <Link to="/login">log in</Link> to register vouchers usage.
    </div>
  )
}

export const UseLogNewSimple = () => {
  const useLogs = useApiFetcher(() => voucherService.getUseLogs(1, 5))
  const userDetails = useSelector(getUserDetails)

  if (!useLogs) {
    return (
      <>
        <h1>Use vouchers</h1>
        <Loader isLoading={true} />
      </>
    )
  }

  return (
    <>
      <h1>Use vouchers</h1>
      <New userDetails={userDetails} />
      <UseLogs useLogs={useLogs.results} />
    </>
  )
}
