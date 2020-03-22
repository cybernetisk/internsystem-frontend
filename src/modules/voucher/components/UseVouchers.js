import React from "react"
import * as actions from "../actions"
import VoucherService from "../services/VoucherService"
import UserInput from "./UserInput"

export default class UseVouchers extends React.Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.updateAvailable = this.updateAvailable.bind(this)

    this.state = {
      username: this.props.defaultUsername,
      vouchers: "",
      vouchersAvailable: "unknown",
      comment: "",
      isSending: false,
    }

    if (this.state.username !== "") {
      this.updateAvailable(this.state.username)
    }
  }

  handleChange(field) {
    return (event) => {
      const val = event.target ? event.target.value : event
      this.setState({ [field]: val })
      if (field == "username") {
        this.updateAvailable(val)
      }
    }
  }

  updateAvailable(username) {
    if (username == "") {
      this.setState({
        vouchersAvailable: "unknown",
      })
      return
    }

    this.setState({
      vouchersAvailable: "loading",
    })
    VoucherService.getWallets({ user: username, valid: true }).then(
      (result) => {
        this.setState({
          vouchersAvailable: result.reduce(
            (prev, wallet) => prev + parseFloat(wallet.cached_balance),
            0,
          ),
        })
      },
      () => {
        this.setState({
          vouchersAvailable: "unknown",
        })
      },
    )
  }

  handleSave(event) {
    // TODO: validation

    event.preventDefault()
    if (this.state.isSending || this.state.username === "") {
      return
    }

    this.setState({ isSending: true })

    const s = this.state
    VoucherService.useVouchers(s.username, s.vouchers, s.comment).then(
      () => {
        actions.fetchUseLogs(1, this.props.useLogsLimit)
        this.setState({
          isSending: false,
          username: "",
          vouchers: "",
          vouchersAvailable: "unknown",
        })
      },
      (error) => {
        alert(error.responseText)
        this.setState({ isSending: false })
      },
    )
  }

  renderForm() {
    return (
      <form onSubmit={this.handleSave}>
        <div className="row">
          <div className="col-sm-2 col-xs-4 form-group">
            <UserInput
              value={this.state.username}
              onChange={this.handleChange("username")}
            />
          </div>
          <div className="col-sm-2 col-xs-3 text-center form-group">
            <div className="form-control-static">
              Available: {this.state.vouchersAvailable}
            </div>
          </div>
          <div className="col-sm-3 col-xs-5 form-group">
            <input
              type="number"
              className="form-control"
              placeholder="# to spend"
              value={this.state.vouchers}
              onChange={this.handleChange("vouchers")}
            />
          </div>
          <div className="col-sm-3 col-xs-6 form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Optional comment"
              value={this.state.comment}
              onChange={this.handleChange("comment")}
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
  }

  render() {
    if (this.props.hidePanel) {
      return this.renderForm()
    }

    return (
      <div className="panel panel-default">
        <div className="panel-heading">Use vouchers</div>
        <div className="panel-body">{this.renderForm()}</div>
      </div>
    )
  }
}
