import React from 'react'

export default class extends React.Component {

  static propTypes = {
    item: React.PropTypes.object.isRequired,
    ctrl: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)

    this.removeMe = this.removeMe.bind(this)
    this.saveMe = this.saveMe.bind(this)
  }

  removeMe() {
    this.props.item.remove()
  }

  saveMe(e) {
    e.preventDefault()
    this.props.item.store({
      antall: math.eval(this.refs.antall.getDOMNode().value.replace(",", ".")),
      antallpant: math.eval(this.refs.antallpant.getDOMNode().value.replace(",", ".")),
      kommentar: this.refs.kommentar.getDOMNode().value,
      sted: this.refs.sted.getDOMNode().value
    })
  }

  render() {
    return (
      <form className="form-inline" onSubmit={this.saveMe}>
        <p>
          <div className="form-group">
            <input className="form-control" type="text" placeholder="Quantity" ref="antall" required autoFocus/>
          </div>
          {' '}
          <div className="form-group">
            <input className="form-control" type="text" placeholder="Quantity (pant)"
              ref="antallpant"/> {/* TODO: translate */}
          </div>
          {' '}
          <div className="form-group">
            <input className="form-control telling-sted" type="text" placeholder="Location"
              defaultValue={this.props.ctrl.newitem_place} ref="sted" required/>
          </div>
        </p>
        <p>
          <div className="form-group">
            <input className="form-control telling-kommentar" type="text" placeholder="Comment" ref="kommentar"/>
          </div>
          {' '}
          <div className="form-group">
            <a className="btn btn-danger" onClick={this.removeMe}><i className="glyphicon glyphicon-remove"></i></a>
          </div>
          <input type="submit"/>
        </p>
      </form>
    )
  }
}
