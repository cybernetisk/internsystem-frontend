import { voucherService } from "modules/voucher/service"
import React, { useState } from "react"
import moment from "utils/moment"
import { UserInput } from "./UserInput"
import { WorkGroupInput } from "./WorkGroupInput"

export const WorkLogNew = () => {
  const [date, setDate] = useState(() => moment().format("YYYY-MM-DD"))
  const [workGroup, setWorkGroup] = useState("")
  const [username, setUsername] = useState("")
  const [hours, setHours] = useState("")
  const [comment, setComment] = useState("")
  const [isSending, setIsSending] = useState(false)

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    // TODO: validation

    event.preventDefault()
    if (isSending) {
      return
    }

    setIsSending(true)

    voucherService
      .registerWork({
        user: username,
        date_worked: date,
        work_group: workGroup,
        hours: parseFloat(hours),
        comment,
      })
      .then(
        () => setUsername(""),
        error => alert("An error occurred: " + error.message),
      )
      .finally(() => {
        setIsSending(false)
      })
  }

  return (
    <div className="panel panel-default">
      <div className="panel-heading">Register work</div>
      <div className="panel-body">
        <form onSubmit={handleSave}>
          <div className="row">
            <div className="col-sm-2">
              <input
                type="date"
                className="form-control"
                placeholder="date of work"
                value={date}
                onChange={e => setDate(e.target.value)}
              />
            </div>
            <div className="col-sm-2">
              <WorkGroupInput
                value={workGroup}
                onChange={v => setWorkGroup(v)}
              />
            </div>
            <div className="col-sm-2">
              <UserInput value={username} onChange={v => setUsername(v)} />
            </div>
            <div className="col-sm-2">
              <input
                type="number"
                className="form-control"
                placeholder="Hours, eg. 1.5"
                value={hours}
                onChange={e => setHours(e.target.value)}
                step="0.01"
                min="0"
              />
            </div>
            <div className="col-sm-2">
              <input
                type="text"
                className="form-control"
                placeholder="Optional comment"
                value={comment}
                onChange={e => setComment(e.target.value)}
              />
            </div>
            <div className="col-sm-2">
              <input
                type="submit"
                className="form-control btn-success"
                value="Register work"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
