import React from 'react'
import { evaluate } from 'mathjs'

export default class NewVare extends React.Component {

  static propTypes = {}

  constructor(props) {
    super(props)

    this.saveMe = this.saveMe.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  saveMe(e) {
    e.preventDefault()
    this.props.storeHandle({
      antall: evaluate(this.props.antall.replace(',', '.')),
      antallpant: evaluate(this.props.antallpant.replace(',', '.')),
      kommentar: this.props.kommentar,
      sted: this.props.sted
    })
  }

  handleKeyDown(e) {
    const KEY_ESCAPE = 27

    if (e.keyCode == KEY_ESCAPE) {
      this.props.removeHandle()
    }
  }

  render() {
    return (
      <form className="form-inline" onSubmit={this.saveMe}>
        <p>
          <div className="form-group">
            <input className="form-control telling-antall" type="text" placeholder="Quantity" required autoFocus
              onChange={this.props.changeHandleBind('antall')} value={this.props.antall}
              onKeyDown={this.handleKeyDown}
            />
          </div>
          {' '}
          <div className="form-group">
            <input className="form-control telling-antallpant" type="text" placeholder="Pant (quantity)"
              onChange={this.props.changeHandleBind('antallpant')}
              value={this.props.antallpant}
              onKeyDown={this.handleKeyDown}
            />
          </div>
          {' '}
          <div className="form-group">
            <input className="form-control telling-sted" type="text" placeholder="Location"
              defaultValue={this.props.defaultPlace} value={this.props.sted}
              onChange={this.props.changeHandleBind('sted')}
              onKeyDown={this.handleKeyDown}
            />
          </div>
        </p>
        <p>
          <div className="form-group">
            <input className="form-control telling-kommentar" type="text" placeholder="Comment"
              onChange={this.props.changeHandleBind('kommentar')} value={this.props.kommentar}
              onKeyDown={this.handleKeyDown}
            />
          </div>
          {' '}
          <div className="form-group">
            <button type="button" className="btn btn-danger" onClick={this.props.removeHandle}>
              <i className="glyphicon glyphicon-remove" />
            </button>
          </div>
          <input type="submit"/>
        </p>
      </form>
    )
  }
}
