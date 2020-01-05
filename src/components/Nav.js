import { connect } from "nuclear-js-react-addons-chefsplate"
import React from "react"
import { MenuItem, Nav as RefNav, Navbar, NavItem } from "react-bootstrap"
import { Link } from "react-router-dom"
import { authdata, isLoggedIn, userDetails } from "../modules/auth/getters"
import NavDropdown from "./NavDropdown"
import NavLink from "./NavLink"

@connect(() => ({
  authdata,
  userDetails,
  isLoggedIn,
}))
export default class Nav extends React.Component {
  renderProfileMenu() {
    if (this.props.authdata.get("isLoading")) {
      return (
        <RefNav pullRight>
          <NavItem className="navbar-text">Loading data ..</NavItem>
        </RefNav>
      )
    } else if (this.props.authdata.get("error")) {
      return (
        <RefNav pullRight>
          <NavItem className="navbar-text">
            Error: {this.props.authdata.get("error")}
          </NavItem>
        </RefNav>
      )
    } else if (this.props.isLoggedIn) {
      return (
        <RefNav pullRight>
          <NavDropdown
            title={this.props.userDetails.realname}
            id="nav-auth-dropdown"
          >
            <NavLink to="/profile">Profile</NavLink>
            <NavLink to="/logout">Log out</NavLink>
          </NavDropdown>
        </RefNav>
      )
    } else {
      return (
        <RefNav pullRight>
          <NavLink to="/login">Log in with UiO-account</NavLink>
        </RefNav>
      )
    }
  }

  render() {
    const profileMenu = this.renderProfileMenu()

    return (
      <Navbar fixedTop inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">CYB internsystem</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <RefNav>
            <NavDropdown title="Products" id="nav-products-dropdown">
              <NavLink to="/varer/accounts">Account list</NavLink>
              <NavLink to="/varer/inventorycounts">Inventory counts</NavLink>
              <NavLink to="/varer/inventory">Inventory items</NavLink>
              <NavLink to="/varer/salesestimates">Sales estimates</NavLink>
              <NavLink to="/varer/products">Sales products</NavLink>
              <NavLink to="/varer/vendors">Vendor list</NavLink>
            </NavDropdown>
            <NavDropdown title="Z" id="nav-z-dropdown">
              <NavLink to="/z">Overview</NavLink>
              <MenuItem divider />
              <MenuItem header>Modules</MenuItem>
              <NavLink to="/z/stats">Statistics</NavLink>
            </NavDropdown>
            <NavDropdown title="Vouchers" id="nav-voucher-dropdown">
              <NavLink to="/voucher/stats">Overview</NavLink>
              <NavLink to="/voucher/use">Use vouchers</NavLink>
              <NavLink to="/voucher/uselogs">Logs of usage</NavLink>
              <NavLink to="/voucher/worklogs">Register work / logs</NavLink>
            </NavDropdown>
            <NavDropdown title="Member" id="nav-member-dropdown">
              <NavLink to="/member">Overview</NavLink>
              <NavLink to="/member/add">Add member</NavLink>
              <NavLink to="/member/list">Member List</NavLink>
              <NavLink to="/member/search">Search</NavLink>
              <NavLink to="/member/lifetime">Lifetime</NavLink>
            </NavDropdown>
            <NavDropdown title="Garm" id="nav-intern-dropdown">
              <NavLink to="/intern">Overview</NavLink>
              <MenuItem divider />
              <NavLink to="/intern/levels">Access Levels</NavLink>
              <NavLink to="/intern/groups">Groups</NavLink>
              <NavLink to="/intern/interns">Interns</NavLink>
              <NavLink to="/intern/roles">Roles</NavLink>
            </NavDropdown>
            <NavDropdown title="Other" id="nav-other-dropdown">
              <NavItem
                target="_self"
                href="http://heim.ifi.uio.no/cyb/tilganger/"
              >
                Access control management (Garm)
              </NavItem>
              <NavItem target="_self" href="admin/">
                Admin Panel
              </NavItem>
              <NavItem target="_self" href="https://jira.cyb.no/">
                JIRA (task management)
              </NavItem>
              <NavItem target="_self" href="https://confluence.cyb.no/">
                Wiki (Confluence)
              </NavItem>
              <NavItem target="_self" href="https://github.com/cybernetisk/">
                GitHub-organization
              </NavItem>
              <NavItem target="_self" href="https://cybernetisk.slack.com/">
                Slack
              </NavItem>
              <NavItem
                target="_self"
                href="https://www.facebook.com/groups/CYB.intern/"
              >
                Facebook group: CYB Intern
              </NavItem>
            </NavDropdown>
          </RefNav>
          {profileMenu}
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
