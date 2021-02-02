import { voucherService } from "modules/voucher/service"
import React, { useEffect, useRef, useState } from "react"
import { UserInput } from "./UserInput"

export const UseLogNew = ({
  hidePanel = false,
  defaultUsername,
}: {
  hidePanel?: boolean
  defaultUsername: string
}) => {
  const [username, setUsername] = useState(defaultUsername)
  const [vouchers, setVouchers] = useState("")
  const [vouchersAvailable, setVouchersAvailable] = useState("unknown")
  const [comment, setComment] = useState("")
  const [isSending, setIsSending] = useState(false)

  const lastUsername = useRef("")
  lastUsername.current = username

  const updateAvailable = (username: string) => {
    if (username == "") {
      setVouchersAvailable("unknown")
      return
    }

    setVouchersAvailable("loading")
    voucherService.getWallets({ user: username, valid: true }).then(
      (result) => {
        if (lastUsername.current === username) {
          setVouchersAvailable(
            String(
              result.reduce(
                (prev, wallet) => prev + parseFloat(wallet.cached_balance),
                0,
              ),
            ),
          )
        }
      },
      () => {
        if (lastUsername.current === username) {
          setVouchersAvailable("unknown")
        }
      },
    )
  }

  useEffect(() => updateAvailable(username), [])

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    // TODO: validation

    event.preventDefault()
    if (isSending || username === "") {
      return
    }

    setIsSending(true)

    voucherService
      .useVouchers(username, parseFloat(vouchers), comment)
      .then(
        () => {
          setUsername("")
          setVouchers("")
          setVouchersAvailable("unknown")
        },
        (error) => alert("An error occurred: " + error.message),
      )
      .finally(() => {
        setIsSending(false)
      })
  }

  const form = (
    <form onSubmit={handleSave}>
      <div className="row">
        <div className="col-sm-2 col-xs-4 form-group">
          <UserInput
            value={username}
            onChange={(v) => {
              setUsername(v)
              updateAvailable(v)
            }}
          />
        </div>
        <div className="col-sm-2 col-xs-3 text-center form-group">
          <div className="form-control-static">
            Available: {vouchersAvailable}
          </div>
        </div>
        <div className="col-sm-3 col-xs-5 form-group">
          <input
            type="number"
            className="form-control"
            placeholder="# to spend"
            value={vouchers}
            onChange={(e) => setVouchers(e.target.value)}
          />
        </div>
        <div className="col-sm-3 col-xs-6 form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Optional comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <div className="col-sm-2 col-xs-6 form-group">
          <input
            type="submit"
            className="form-control btn-primary"
            value="Register"
          />
        </div>
      </div>
    </form>
  )

  if (hidePanel) {
    return form
  }

  return (
    <div className="panel panel-default">
      <div className="panel-heading">Use vouchers</div>
      <div className="panel-body">{form}</div>
    </div>
  )
}
