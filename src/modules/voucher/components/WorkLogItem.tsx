import { voucherService } from "modules/voucher/service"
import { WorkLog } from "modules/voucher/types"
import React, { useLayoutEffect, useRef, useState } from "react"
import { antall } from "services/FormatService"
import moment from "utils/moment"
import { WorkGroupInput } from "./WorkGroupInput"

const Time = ({ value }: { value: string }) => (
  <>{moment(value).format("YYYY-MM-DD HH:mm")}</>
)

const Who = ({ worklog }: { worklog: WorkLog }) => {
  let who = worklog.wallet.user.username
  if (worklog.wallet.user.realname) {
    who += ` (${worklog.wallet.user.realname})`
  }
  return <>{who}</>
}

const By = ({ worklog }: { worklog: WorkLog }) => {
  if (worklog.issuing_user.username != worklog.wallet.user.username) {
    return <>by {worklog.issuing_user.username}</>
  }

  return null
}

const LastCol = ({
  worklog,
  setIsEditing,
}: {
  worklog: WorkLog
  setIsEditing(value: boolean): void
}) => {
  const deleteIt = () => {
    if (confirm("Are you sure you want to permanently remove this entry?")) {
      voucherService.deleteWorkLog(worklog.id).catch((err) => {
        alert("Error occurred: " + err.message)
      })
    }
  }

  const editButton = worklog.can_edit && (
    <button
      type="button"
      className="btn btn-default btn-xs"
      onClick={() => setIsEditing(true)}
    >
      <span className="glyphicon glyphicon-pencil" />
    </button>
  )

  const deleteButton = worklog.can_delete && (
    <button type="button" className="btn btn-danger btn-xs" onClick={deleteIt}>
      <span className="glyphicon glyphicon-remove" />
    </button>
  )

  return (
    <td>
      {editButton}
      {editButton && deleteButton && " "}
      {deleteButton}
    </td>
  )
}

const Edit = ({
  worklog,
  setIsEditing,
}: {
  worklog: WorkLog
  setIsEditing(value: boolean): void
}) => {
  const dateWorkedRef = useRef<HTMLInputElement>(null)

  const [dateWorked, setDateWorked] = useState(worklog.date_worked)
  const [workGroup, setWorkGroup] = useState(worklog.work_group)
  const [hours, setHours] = useState(worklog.hours)
  const [comment, setComment] = useState(worklog.comment)

  useLayoutEffect(() => {
    dateWorkedRef.current?.focus()
  }, [])

  const save = () => {
    voucherService
      .updateWorkLog(worklog.id, {
        date_worked: dateWorked,
        work_group: workGroup,
        hours: hours,
        comment: comment,
      })
      .then(
        () => setIsEditing(false),
        (error) => alert("An error occurred: " + error.message),
      )
  }

  const detectKeyEvents = (event: React.KeyboardEvent) => {
    const KEY_ENTER = 13
    const KEY_ESCAPE = 27

    if (event.keyCode == KEY_ENTER) {
      save()
    } else if (event.keyCode == KEY_ESCAPE) {
      setIsEditing(false)
    }
  }

  return (
    <tr key={worklog.id}>
      <td>
        <input
          type="date"
          className="form-control"
          placeholder="date of work"
          value={dateWorked}
          onChange={(e) => setDateWorked(e.target.value)}
          ref={dateWorkedRef}
          onKeyDown={detectKeyEvents}
        />
      </td>
      <td>
        <Who worklog={worklog} />
      </td>
      <td>
        <WorkGroupInput
          value={workGroup}
          onChange={(v) => setWorkGroup(v)}
          onKeyDown={detectKeyEvents}
        />
      </td>
      <td>
        <input
          type="number"
          className="form-control"
          placeholder="Hours, eg. 1.5"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          step="0.01"
          min="0"
          onKeyDown={detectKeyEvents}
        />
      </td>
      <td>&nbsp;</td>
      <td>
        <input
          type="text"
          className="form-control"
          placeholder="Optional comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={detectKeyEvents}
        />
        <div className="small text-muted">
          Registered <By worklog={worklog} />{" "}
          <Time value={worklog.date_issued} />
        </div>
      </td>
      <td>
        <button type="button" className="btn btn-default" onClick={save}>
          <span className="glyphicon glyphicon-ok" />
        </button>{" "}
        <button
          type="button"
          className="btn btn-default"
          onClick={() => setIsEditing(false)}
        >
          <span className="glyphicon glyphicon-remove" /> Abort
        </button>
      </td>
    </tr>
  )
}

const RenderNormal = ({
  worklog,
  showLastCol,
  setIsEditing,
}: {
  worklog: WorkLog
  showLastCol: boolean
  setIsEditing(value: boolean): void
}) => {
  return (
    <tr key={worklog.id}>
      <td>{worklog.date_worked}</td>
      <td>
        <Who worklog={worklog} />
      </td>
      <td>{worklog.work_group}</td>
      <td>{antall(parseFloat(worklog.hours))}</td>
      <td>{antall(parseFloat(worklog.wallet.cached_balance))}</td>
      <td>
        {worklog.comment}
        <div className="small text-muted">
          Registered <By worklog={worklog} />{" "}
          <Time value={worklog.date_issued} />
        </div>
      </td>
      {showLastCol && <LastCol worklog={worklog} setIsEditing={setIsEditing} />}
    </tr>
  )
}

export const WorkLogItem = ({
  worklog,
  showLastCol,
}: {
  worklog: WorkLog
  showLastCol: boolean
}) => {
  const [isEditing, setIsEditing] = useState(false)

  if (isEditing) {
    return <Edit worklog={worklog} setIsEditing={setIsEditing} />
  } else {
    return (
      <RenderNormal
        worklog={worklog}
        showLastCol={showLastCol}
        setIsEditing={setIsEditing}
      />
    )
  }
}
