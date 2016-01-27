import React from 'react'
import { Link } from 'react-router'
import { connect } from 'nuclear-js-react-addons'

import { authdata, userDetails, isLoggedIn } from '../modules/auth/getters'
import NavDropdown from './NavDropdown'
import NavLink from './NavLink'

@connect(props => ({
  authdata,
  userDetails,
  isLoggedIn,
}))
export default class Nav extends React.Component {
  renderProfileMenu() {
    if (this.props.authdata.get('isLoading')) {
      return (
        <ul className='nav navbar-nav navbar-right'>
          <p className='navbar-text'>Loading data ..</p>
        </ul>
      )
    } else if (this.props.authdata.get('error')) {
      return (
        <ul className='nav navbar-nav navbar-right'>
          <p className='navbar-text'>Error: {this.props.authdata.get('error')}</p>
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
          <NavLink to='auth.login'>Log in with UiO-account</NavLink>
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
                <a href className='dropdown-toggle' data-toggle='dropdown' role='button' aria-expanded='false'>
                  Products
                  <span className='caret'></span>
                </a>
                <ul className='dropdown-menu' role='menu'>
                  <NavLink to='varer/accounts'>Account list</NavLink>
                  <NavLink to='varer/inventorycounts'>Inventory counts</NavLink>
                  <NavLink to='varer/inventory'>Inventory items</NavLink>
                  <NavLink to='varer/salesestimates'>Sales estimates</NavLink>
                  <NavLink to='varer/products'>Sales products</NavLink>
                  <NavLink to='varer/vendors'>Vendor list</NavLink>
                </ul>
              </NavDropdown>
              <NavDropdown>
                <a href className='dropdown-toggle' data-toggle='dropdown' role='button' aria-expanded='false'>
                  Z
                  <span className='caret'></span>
                </a>
                <ul className='dropdown-menu' role='menu'>
                  <NavLink to='z'>Overview</NavLink>
                  <li className='divider'></li>
                  <li className='dropdown-header'>Modules</li>
                  <NavLink to='z/stats'>Statistics</NavLink>
                </ul>
              </NavDropdown>
              <NavDropdown>
                <a href className='dropdown-toggle' data-toggle='dropdown' role='button' aria-expanded='false'>
                  Calendar
                  <span className='caret'></span>
                </a>
                <ul className='dropdown-menu' role='menu'>
                  <NavLink to='cal/list'>Overview</NavLink>
                </ul>
              </NavDropdown>
              <NavDropdown>
                <a href className='dropdown-toggle' data-toggle='dropdown' role='button' aria-expanded='false'>
                  Vouchers
                  <span className='caret'></span>
                </a>
                <ul className='dropdown-menu' role='menu'>
                  <NavLink to='voucher/stats'>Overview</NavLink>
                  <NavLink to='voucher/uselogs'>Use logs</NavLink>
                  <NavLink to='voucher/worklogs'>Work logs</NavLink>
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
                  <li><a target='_self' href='https://github.com/cybrairai/'>GitHub-organization</a></li>
                  <li><a target='_self' href='https://cybernetisk.slack.com/'>Slack</a></li>
                  <li><a target='_self' href='https://www.facebook.com/groups/CYB.intern/'>Facebook group: CYB Intern</a></li>
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