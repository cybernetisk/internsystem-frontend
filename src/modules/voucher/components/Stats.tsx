import Loader from "components/Loader"
import { getUserDetails } from "modules/auth/selectors"
import { voucherService } from "modules/voucher/service"
import React, { ReactNode } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useApiFetcher } from "utils/api"
import { Wallet, WalletStats } from "../types"

const WalletBalance = ({
  walletStats,
  myWallets,
}: {
  walletStats: WalletStats
  myWallets?: Wallet[] | null
}) => {
  const myWallet = myWallets?.find(
    (it) => it.semester.id === walletStats.semester.id,
  )

  if (myWallet) {
    const balance = myWallet.cached_balance
    if (myWallet.is_valid) {
      return <>{balance}</>
    } else {
      return <>{balance} (expired)</>
    }
  } else {
    return <>0</>
  }
}

const StatsDetails = ({
  children,
  stats,
  myWallets,
}: {
  children: ReactNode
  stats: WalletStats[]
  myWallets?: Wallet[] | null
}) => {
  const showCurrentUser = (myWallets?.length ?? 0) > 0

  return (
    <div>
      <p>
        If you have any problems go to{" "}
        <a href="https://cybernetisk.slack.com/messages/it/details/">#it</a> on
        Slack
      </p>
      <div className="pull-right">
        <Link to="/voucher/worklogs" className="btn btn-success">
          Register work
        </Link>{" "}
        <Link to="/voucher/uselogs" className="btn btn-primary">
          Use vouchers
        </Link>
      </div>
      {children}
      <h2>Semester list</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Semester</th>
            <th>Sum vouchers</th>
            <th>Unused vouchers</th>
            <th>Used vouchers</th>
            <th>People</th>
            {showCurrentUser ? <th>Your balance</th> : null}
          </tr>
        </thead>
        <tbody>
          {stats.map((walletStats) => (
            <tr key={walletStats.semester.id}>
              <td>
                <Link to={`/voucher/semester/${walletStats.semester.id}`}>
                  {walletStats.semester.year} {walletStats.semester.semester}
                </Link>
              </td>
              <td>{walletStats.sum_vouchers}</td>
              <td>{walletStats.sum_balance}</td>
              <td>{walletStats.sum_vouchers_used}</td>
              <td>{walletStats.count_users}</td>
              {showCurrentUser && (
                <td>
                  <WalletBalance
                    walletStats={walletStats}
                    myWallets={myWallets}
                  />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export const Stats = ({ children }: { children: ReactNode }) => {
  const stats = useApiFetcher(voucherService.getWalletStats)
  const userDetails = useSelector(getUserDetails)

  const myWallets = useApiFetcher(async () => {
    if (!userDetails) return null
    return voucherService.getWallets({ user: userDetails.username })
  }, [userDetails])

  return (
    <div>
      <h1>Vouchers</h1>
      <Loader isLoading={!stats} />
      {stats && (
        <StatsDetails stats={stats} myWallets={myWallets}>
          {children}
        </StatsDetails>
      )}
    </div>
  )
}
