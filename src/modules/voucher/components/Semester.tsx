import Loader from "components/Loader"
import { voucherService } from "modules/voucher/service"
import { Wallet } from "modules/voucher/types"
import React, { useMemo } from "react"
import { useApiFetcher } from "utils/api"

const Wallets = ({ wallets }: { wallets: Wallet[] }) => (
  <table className="table table-striped">
    <thead>
      <tr>
        <th>Person</th>
        <th>Balance</th>
        <th>Hours tracked</th>
        <th>Vouchers earned</th>
        <th>Vouchers used</th>
      </tr>
    </thead>
    <tbody>
      {wallets.map(wallet => (
        <tr key={wallet.id}>
          <td>
            {wallet.user.username} ({wallet.user.realname})
          </td>
          <td>{wallet.cached_balance}</td>
          <td>{wallet.cached_hours}</td>
          <td>{wallet.cached_vouchers}</td>
          <td>{wallet.cached_vouchers_used}</td>
        </tr>
      ))}
    </tbody>
  </table>
)

export const SemesterPage = ({
  match: {
    params: { semesterId },
  },
}: {
  match: { params: { semesterId: string } }
}) => {
  const wallets = useApiFetcher(
    () => voucherService.getWallets({ semester: semesterId }),
    [semesterId],
  )
  const stats = useApiFetcher(voucherService.getWalletStats)
  const semester = useMemo(
    () =>
      stats?.find(it => String(it.semester.id) === semesterId)?.semester ??
      null,
    [semesterId, stats],
  )

  if (!wallets || !stats) {
    return (
      <>
        <h2>Semester ??</h2>
        <Loader isLoading={true} />
      </>
    )
  }

  if (!semester) {
    return (
      <>
        <h2>Semester ??</h2>
        <p>Semester not found.</p>
      </>
    )
  }

  return (
    <div>
      <h2>
        Semester {semester.year} {semester.semester}
      </h2>
      <Wallets wallets={wallets} />
    </div>
  )
}
