import React from "react"
import moment from "../../../moment"
import { antall } from "../../../services/FormatService"
import * as actions from "../actions"
import VoucherService from "../services/VoucherService"
import WorkGroupInput from "./WorkGroupInput"

export default class WorkLogItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
      dateWorked: props.worklog.date_worked,
      workGroup: props.worklog.work_group,
      hours: props.worklog.hours,
      comment: props.worklog.comment,
    }
    this.dateWorkedRef = React.createRef()

    this.startEdit = this.startEdit.bind(this)
    this.cancelEdit = this.cancelEdit.bind(this)
    this.delete = this.delete.bind(this)
    this.save = this.save.bind(this)
    this.detectKeyEvents = this.detectKeyEvents.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  startEdit() {
    this.setState({
      isEditing: true,
    })
    setTimeout(() => {
      this.dateWorkedRef.current.focus()
    })
  }

  cancelEdit() {
    this.setState({
      isEditing: false,
    })
  }

  delete() {
    if (confirm("Are you sure you want to permanently remove this entry?")) {
      VoucherService.deleteWorkLog(this.props.worklog.id).then(
        () => {
          actions.workLogDeleted(this.props.worklog.id)
        },
        error => {
          alert(error.responseText)
        },
      )
    }
  }

  save() {
    VoucherService.updateWorkLog(this.props.worklog.id, {
      // eslint-disable-next-line @typescript-eslint/camelcase
      date_worked: this.state.dateWorked,
      // eslint-disable-next-line @typescript-eslint/camelcase
      work_group: this.state.workGroup,
      hours: this.state.hours,
      comment: this.state.comment,
    }).then(
      result => {
        actions.workLogUpdated(result)
        this.setState({
          isEditing: false,
        })
      },
      error => {
        alert(error.responseText)
      },
    )
  }

  detectKeyEvents(event) {
    const KEY_ENTER = 13
    const KEY_ESCAPE = 27

    if (event.keyCode == KEY_ENTER) {
      this.save()
    } else if (event.keyCode == KEY_ESCAPE) {
      this.cancelEdit()
    }
  }

  handleChange(field) {
    return event => {
      this.setState({ [field]: event.target ? event.target.value : event })
    }
  }

  renderEditing() {
    const worklog = this.props.worklog

    const time = moment(worklog.date_issued).format("YYYY-MM-DD HH:mm")
    const regBy =
      worklog.issuing_user.username == worklog.wallet.user.username
        ? ""
        : `by ${worklog.issuing_user.username}`

    return (
      <tr key={worklog.id}>
        <td>
          <input
            type="date"
            className="form-control"
            placeholder="date of work"
            value={this.state.dateWorked}
            onChange={this.handleChange("dateWorked")}
            ref={this.dateWorkedRef}
            onKeyDown={this.detectKeyEvents}
          />
        </td>
        <td>{this.getWho(worklog)}</td>
        <td>
          <WorkGroupInput
            value={this.state.workGroup}
            onChange={this.handleChange("workGroup")}
            onKeyDown={this.detectKeyEvents}
          />
        </td>
        <td>
          <input
            type="number"
            className="form-control"
            placeholder="Hours, eg. 1.5"
            value={this.state.hours}
            onChange={this.handleChange("hours")}
            step="0.01"
            min="0"
            onKeyDown={this.detectKeyEvents}
          />
        </td>
        <td>&nbsp;</td>
        <td>
          <input
            type="text"
            className="form-control"
            placeholder="Optional comment"
            value={this.state.comment}
            onChange={this.handleChange("comment")}
            onKeyDown={this.detectKeyEvents}
          />
          <div className="small text-muted">
            Registered {regBy} {time}
          </div>
        </td>
        <td>
          <button type="button" className="btn btn-default" onClick={this.save}>
            <span className="glyphicon glyphicon-ok" />
          </button>{" "}
          <button
            type="button"
            className="btn btn-default"
            onClick={this.cancelEdit}
          >
            <span className="glyphicon glyphicon-remove" /> Abort
          </button>
        </td>
      </tr>
    )
  }

  getWho(worklog) {
    let who = worklog.wallet.user.username
    if (worklog.wallet.user.realname) {
      who += ` (${worklog.wallet.user.realname})`
    }
    return who
  }

  renderNormal() {
    const worklog = this.props.worklog

    const time = moment(worklog.date_issued).format("YYYY-MM-DD HH:mm")

    let regBy = null
    if (worklog.issuing_user.username != worklog.wallet.user.username) {
      regBy = `by ${worklog.issuing_user.username}`
    }

    let lastCol = ""
    if (this.props.showLastCol) {
      let editButton = null
      if (worklog.can_edit) {
        editButton = (
          <button
            type="button"
            className="btn btn-default btn-xs"
            onClick={this.startEdit}
          >
            <span className="glyphicon glyphicon-pencil" />
          </button>
        )
      }

      let deleteButton = null
      if (worklog.can_delete) {
        deleteButton = (
          <button
            type="button"
            className="btn btn-danger btn-xs"
            onClick={this.delete}
          >
            <span className="glyphicon glyphicon-remove" />
          </button>
        )
      }

      lastCol = (
        <td>
          {editButton} {deleteButton}
        </td>
      )
    }

    return (
      <tr key={worklog.id}>
        <td>{worklog.date_worked}</td>
        <td>{this.getWho(worklog)}</td>
        <td>{worklog.work_group}</td>
        <td>{antall(parseFloat(worklog.hours))}</td>
        <td>{antall(parseFloat(worklog.wallet.cached_balance))}</td>
        <td>
          {worklog.comment}
          <div className="small text-muted">
            Registered {regBy} {time}
          </div>
        </td>
        {lastCol}
      </tr>
    )
  }

  render() {
    if (this.state.isEditing) {
      return this.renderEditing()
    } else {
      return this.renderNormal()
    }
  }
}
