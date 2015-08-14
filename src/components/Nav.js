import React from 'react';
import { Link } from 'react-router';
import { nuclearComponent } from 'nuclear-js-react-addons'

import { authdata, userDetails, isLoggedIn } from '../modules/auth/getters'

export default
@nuclearComponent({
  authdata,
  userDetails,
  isLoggedIn,
})
class Nav extends React.Component {
  renderProfileMenu() {
    if (this.props.authdata.get('isLoading')) {
      return (
        <ul className='nav navbar-nav navbar-right'>
          <p className='navbar-text'>Laster data ..</p>
        </ul>
      )
    } else if (this.props.authdata.get('error')) {
      return (
        <ul className='nav navbar-nav navbar-right'>
          <p className='navbar-text'>Feil: {this.props.authdata.get('error')}</p>
        </ul>
      )
    } else if (this.props.isLoggedIn) {
      return (
        <ul className='nav navbar-nav navbar-right'>
          <li className='dropdown'>
            <a href className='dropdown-toggle' data-toggle='dropdown' role='button'
              aria-expanded='false'>{this.props.userDetails.realname} <span className='caret'></span></a>
            <ul className='dropdown-menu' role='menu'>
              <li><Link to='auth.profile'>Profile</Link></li>
              <li><Link to='auth.logout'>Log out</Link></li>
            </ul>
          </li>
        </ul>
      )
    } else {
      return (
        <ul className='nav navbar-nav navbar-right'>
          <li><Link to='auth.login'>Log in</Link></li>
        </ul>
      )
    }
  }

  render() {
    let profileMenu = this.renderProfileMenu()

    return (
      <nav className='navbar navbar-inverse navbar-fixed-top' role='navigation'>
        <div className='container'>
          <div className='navbar-header'>
            <button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#navbar'
              aria-expanded='false' aria-controls='navbar'>
              <span className='sr-only'>Toggle navigation</span>
              <span className='icon-bar'></span>
              <span className='icon-bar'></span>
              <span className='icon-bar'></span>
            </button>
            <Link className='navbar-brand' to='index'>CYB internsystem</Link>
          </div>
          <div id='navbar' className='collapse navbar-collapse'>
            <ul className='nav navbar-nav'>
              <li className='dropdown'>
                <a href className='dropdown-toggle' data-toggle='dropdown' role='button' aria-expanded='false'>Varer
                  <span className='caret'></span></a>
                <ul className='dropdown-menu' role='menu'>
                  <li><Link to='varer'>Oversikt</Link></li>
                  <li className='divider'></li>
                  <li className='dropdown-header'>Moduler</li>
                  <li><Link to='varer/råvarer'>Råvarer</Link></li>
                  <li><Link to='varer/salgsvarer'>Salgsvarer</Link></li>
                  <li><Link to='varer/kontoer'>Kontoliste</Link></li>
                  <li><Link to='varer/leverandører'>Leverandørliste</Link></li>
                  <li><Link to='varer/salgskalkyler'>Salgskalkyler</Link></li>
                  <li><Link to='varer/varetellinger'>Varetellinger</Link></li>
                </ul>
              </li>
              <li className='dropdown'>
                <a href className='dropdown-toggle' data-toggle='dropdown' role='button' aria-expanded='false'>Z <span
                  className='caret'></span></a>
                <ul className='dropdown-menu' role='menu'>
                  <li><Link to='z'>Oversikt</Link></li>
                  <li className='divider'></li>
                  <li className='dropdown-header'>Moduler</li>
                  <li><Link to='z/stats'>Statistikk</Link></li>
                </ul>
              </li>
              <li className='dropdown'>
                <a href className='dropdown-toggle' data-toggle='dropdown' role='button' aria-expanded='false'>Calendar
                  <span className='caret'></span></a>
                <ul className='dropdown-menu' role='menu'>
                  <li><Link to='cal/list'>Oversikt</Link></li>
                </ul>
              </li>
            </ul>
            {profileMenu}
          </div>
        </div>
      </nav>
    )
  }
}