import React from 'react'
import { Link } from 'react-router'
import { nuclearComponent } from 'nuclear-js-react-addons'

import { authdata, userDetails, isLoggedIn } from '../modules/auth/getters'
import NavDropdown from './NavDropdown'
import NavLink from './NavLink'

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
          <NavDropdown>
            <a href className='dropdown-toggle' data-toggle='dropdown' role='button'
              aria-expanded='false'>{this.props.userDetails.realname} <span className='caret'></span></a>
            <ul className='dropdown-menu' role='menu'>
              <NavLink to='auth.profile'>Profile</NavLink>
              <NavLink to='auth.logout'>Log out</NavLink>
            </ul>
          </NavDropdown>
        </ul>
      )
    } else {
      return (
        <ul className='nav navbar-nav navbar-right'>
          <NavLink to='auth.login'>Log in</NavLink>
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
              <NavDropdown>
                <a href className='dropdown-toggle' data-toggle='dropdown' role='button' aria-expanded='false'>Varer
                  <span className='caret'></span></a>
                <ul className='dropdown-menu' role='menu'>
                  <NavLink to='varer'>Oversikt</NavLink>
                  <li className='divider'></li>
                  <li className='dropdown-header'>Moduler</li>
                  <NavLink to='varer/råvarer'>Råvarer</NavLink>
                  <NavLink to='varer/salgsvarer'>Salgsvarer</NavLink>
                  <NavLink to='varer/kontoer'>Kontoliste</NavLink>
                  <NavLink to='varer/leverandører'>Leverandørliste</NavLink>
                  <NavLink to='varer/salgskalkyler'>Salgskalkyler</NavLink>
                  <NavLink to='varer/varetellinger'>Varetellinger</NavLink>
                </ul>
              </NavDropdown>
              <NavDropdown>
                <a href className='dropdown-toggle' data-toggle='dropdown' role='button' aria-expanded='false'>Z <span
                  className='caret'></span></a>
                <ul className='dropdown-menu' role='menu'>
                  <NavLink to='z'>Oversikt</NavLink>
                  <li className='divider'></li>
                  <li className='dropdown-header'>Moduler</li>
                  <NavLink to='z/stats'>Statistikk</NavLink>
                </ul>
              </NavDropdown>
              <NavDropdown>
                <a href className='dropdown-toggle' data-toggle='dropdown' role='button' aria-expanded='false'>Calendar
                  <span className='caret'></span></a>
                <ul className='dropdown-menu' role='menu'>
                  <NavLink to='cal/list'>Oversikt</NavLink>
                </ul>
              </NavDropdown>
              <NavDropdown>
                <a href className='dropdown-toggle' data-toggle='dropdown' role='button' aria-expanded='false'>
                  Other
                  <span className='caret'></span>
                </a>
                <ul className='dropdown-menu' role='menu'>
                  <li><a target='_self' href='http://heim.ifi.uio.no/cyb/tilganger/'>Access control management (Garm)</a></li>
                  <li><a target='_self' href='https://jira.cyb.no/'>JIRA (task management)</a></li>
                  <li><a target='_self' href='https://confluence.cyb.no/'>Wiki (Confluence)</a></li>
                </ul>
              </NavDropdown>
            </ul>
            {profileMenu}
          </div>
        </div>
      </nav>
    )
  }
}